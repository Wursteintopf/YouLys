import { VideoInterface } from '../../../shared/Domain/Model/VideoInterface'
import { VideoStatistic } from './VideoStatistic'
import { VideoRepository } from '../Repository/VideoRepository'
import { connection } from '../../Helper/DatabaseHelper'
import { VideoMeta } from './VideoMeta'
import moment from 'moment'
import { Channel } from './Channel'
import { ChannelRepository } from '../Repository/ChannelRepository'
import { callVideoStatistics } from '../../YoutubeApiCaller/YoutubeApiCaller'
import { VideoThumbnail } from './VideoThumbnail'
import { median } from '../../../shared/Utils/mathUtil'

export class Video implements VideoInterface {
  video_id: string
  channel_id: string
  upload_time: Date
  duration: number
  statistics: VideoStatistic[]

  constructor (props: VideoInterface) {
    this.video_id = props.video_id
    this.channel_id = props.channel_id
    this.upload_time = props.upload_time
    this.duration = props.duration

    if (props.statistics) this.statistics = props.statistics.map(stat => new VideoStatistic(stat))
    else this.statistics = []
  }

  public update = async (): Promise<boolean> => {
    return VideoRepository.Instance.update(this)
  }

  /**
   * Load Data from Database
   */

  public loadNewestStats = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'SELECT video_meta.title, video_meta.description, video_meta.tags, video_thumbnail.thumbnail, video_statistic.* FROM video_statistic LEFT JOIN video_meta ON video_statistic.video_meta_id = video_meta.video_meta_id LEFT JOIN video_thumbnail ON video_statistic.video_thumbnail_id = video_thumbnail.video_thumbnail_id WHERE video_id = ? ORDER BY timestamp DESC LIMIT 1',
        [this.video_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows.length > 0) {
            const stat = new VideoStatistic(rows[0])
            stat.video_meta = new VideoMeta(rows[0])
            stat.video_thumbnail = new VideoThumbnail(rows[0])
            stat.video_thumbnail.loadFaces()
            this.statistics = [stat]
            resolve(true)
          } else {
            reject(new Error('Unable to load newest video stats. No stats found.'))
          }
        },
      )
    })
  }

  public loadStatsInRange = async (from: Date, to: Date): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'SELECT video_meta.title, video_meta.description, video_meta.tags, video_thumbnail.thumbnail, video_statistic.* FROM video_statistic LEFT JOIN video_meta ON video_statistic.video_meta_id = video_meta.video_meta_id LEFT JOIN video_thumbnail ON video_statistic.video_thumbnail_id = video_thumbnail.video_thumbnail_id WHERE video_id = ? AND (timestamp BETWEEN ? AND ?) ORDER BY timestamp DESC',
        [this.video_id, moment(from).format('YYYY-MM-DD HH:mm:ss'), moment(to).format('YYYY-MM-DD HH:mm:ss')],

        async (err, rows) => {
          if (err) reject(err)
          if (rows.length > 0) {
            this.statistics = rows.map(row => {
              const stat = new VideoStatistic(row)
              stat.video_meta = new VideoMeta(row)
              stat.video_thumbnail = new VideoThumbnail(row)
              stat.video_thumbnail.loadFaces()
              return stat
            })
            resolve(true)
          } else {
            reject(new Error('Unable to load video stats in Range. No stats found.'))
          }
        },
      )
    })
  }

  public loadChannel = async (): Promise<Channel> => {
    const channel = await ChannelRepository.Instance.getById(this.channel_id)
    channel.videos = [this]
    return channel
  }

  public loadFiftyPreviousVideosFromSameChannel = async (): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT video.channel_id, video.upload_time, video.duration, video_statistic.* FROM video LEFT JOIN video_statistic ON video.video_id = video_statistic.video_id WHERE (video.channel_id = ?) AND (video.upload_time < ?) AND DATE(timestamp) = (SELECT DATE(timestamp) FROM video_statistic ORDER BY timestamp DESC LIMIT 1) ORDER BY video.upload_time DESC LIMIT 50',
        [this.channel_id, this.upload_time],

        (err, rows) => {
          if (err) reject(err)
          if (rows.length > 0) {
            resolve(rows.map(row => {
              const video = new Video(row)
              video.statistics = [new VideoStatistic(row)]
              return video
            }))
          } else {
            reject(new Error('No previous Videos found.'))
          }
        }
      )
    })
  }

  /**
   * Call Data from API and save to Database
   */

  public callStatistics = async (): Promise<boolean> => {
    try {
      let statsLoaded = false

      await this.loadNewestStats()
        .then(() => { statsLoaded = true })
        .catch(() => { statsLoaded = false })

      const apiResult = await callVideoStatistics(this.video_id)

      let meta = new VideoMeta({
        video_meta_id: 0,
        title: apiResult.snippet.title,
        description: apiResult.snippet.description,
        tags: apiResult.snippet.tags ? apiResult.snippet.tags?.join(',') : '',
      })

      if (statsLoaded && meta.equals(this.statistics[0].video_meta)) {
        meta = this.statistics[0].video_meta
      } else {
        meta.video_meta_id = await VideoRepository.Instance.saveMeta(meta)
      }

      let thumb = new VideoThumbnail({
        video_thumbnail_id: 0,
        thumbnail: apiResult.snippet.thumbnails.maxres ? apiResult.snippet.thumbnails.maxres.url : (apiResult.snippet.thumbnails.standard ? apiResult.snippet.thumbnails.standard.url : apiResult.snippet.thumbnails.high.url),
        faces: [],
      })

      if (statsLoaded && thumb.equals(this.statistics[0].video_thumbnail)) {
        thumb = this.statistics[0].video_thumbnail
      } else {
        thumb.video_thumbnail_id = await VideoRepository.Instance.saveThumbnail(thumb)
        await thumb.detectFaces()
      }

      const stat = new VideoStatistic({
        video_statistic_id: 0,
        video_id: this.video_id,
        video_meta: meta,
        video_thumbnail: thumb,
        views: apiResult.statistics.viewCount,
        likes: apiResult.statistics.likeCount,
        dislikes: apiResult.statistics.dislikeCount,
        favouriteCount: apiResult.statistics.favouriteCount,
        commentCount: apiResult.statistics.commentCount,
        timestamp: new Date(),
        success_factor: 5,
      })

      await this.loadFiftyPreviousVideosFromSameChannel()
        .then(async prevVideos => {
          const medianViews = median(prevVideos.map(v => v.statistics[0].views ? v.statistics[0].views : 0))
          const medianLikes = median(prevVideos.map(v => v.statistics[0].likes ? v.statistics[0].likes : 0))
          const medianDislikes = median(prevVideos.map(v => v.statistics[0].dislikes ? v.statistics[0].dislikes : 0))
          const medianCommentCount = median(prevVideos.map(v => v.statistics[0].commentCount ? v.statistics[0].commentCount : 0))

          const currentViews = apiResult.statistics.viewCount ? apiResult.statistics.viewCount : 0
          const currentLikes = apiResult.statistics.likeCount ? apiResult.statistics.likeCount : 0
          const currentDislikes = apiResult.statistics.dislikeCount ? apiResult.statistics.dislikeCount : 0
          const currentCommentCount = apiResult.statistics.commentCount ? apiResult.statistics.commentCount : 0
          
          const comparedViews = currentViews === 0 ? 0 : (medianViews === 0 ? currentViews : currentViews / medianViews)
          const comparedLikes = currentLikes === 0 ? 0 : (medianLikes === 0 ? currentLikes : currentLikes / medianLikes)
          const comparedDislikes = currentDislikes === 0 ? 0 : (medianDislikes === 0 ? currentDislikes : currentDislikes / medianDislikes)
          const comparedCommentCount = currentCommentCount === 0 ? 0 : (medianCommentCount === 0 ? currentCommentCount : currentCommentCount / medianCommentCount)

          stat.success_factor = (2 * comparedViews) + comparedLikes + comparedDislikes + comparedCommentCount

          console.log('SUCCESS: Calculated success factor of ' + stat.success_factor + ' for video with the id ' + this.video_id)
        })
        .catch(() => console.log('ERROR: Success factor not calculated. No previous videos found for video with the id ' + this.video_id))

      await VideoRepository.Instance.saveStatistic(stat)

      this.duration = moment.duration(apiResult.contentDetails.duration).asSeconds()
      await this.update()

      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
