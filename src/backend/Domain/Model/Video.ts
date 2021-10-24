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
        'SELECT video_meta.title, video_meta.description, video_meta.tags, video_thumbnail.thumbnail, video_statistic.* FROM video_statistic LEFT JOIN video_meta ON video_statistic.video_meta_id = video_meta.video_meta_id LEFT JOIN video_thumbnail ON video_statistic.video_thumbnail_id = video_thumbnail.video_thumbnail_id WHERE video_id = ? AND DATE(timestamp) = (SELECT DATE(timestamp) FROM video_statistic ORDER BY timestamp DESC LIMIT 1)',
        [this.video_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows.length > 0) {
            const stat = new VideoStatistic(rows[0])
            stat.video_meta = new VideoMeta(rows[0])
            stat.video_thumbnail = new VideoThumbnail(rows[0])
            this.statistics = [stat]
            resolve(true)
          } else {
            reject(new Error('Unable to load newest video stats. No stats found.'))
          }
        },
      )
    })
  }

  // TODO: Add Thumbnail table
  public loadStatsInRange = async (from: Date, to: Date): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'SELECT video_meta.title, video_meta.description, video_meta.tags, video_statistic.* FROM video_statistic LEFT JOIN video_meta ON video_statistic.video_meta_id = video_meta.video_meta_id WHERE video_id = ? AND (timestamp BETWEEN ? AND ?) ORDER BY timestamp DESC',
        [this.video_id, moment(from).format('YYYY-MM-DD HH:mm:ss'), moment(to).format('YYYY-MM-DD HH:mm:ss')],

        async (err, rows) => {
          if (err) reject(err)
          if (rows.length > 0) {
            this.statistics = rows.map(row => {
              const statistic = new VideoStatistic(row)
              statistic.video_meta = new VideoMeta(row)
              return statistic
            })
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
      })

      if (statsLoaded && thumb.equals(this.statistics[0].video_thumbnail)) {
        thumb = this.statistics[0].video_thumbnail
      } else {
        thumb.video_thumbnail_id = await VideoRepository.Instance.saveThumbnail(thumb)
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
      })

      await VideoRepository.Instance.saveStatistic(stat)

      this.duration = moment.duration(apiResult.contentDetails.duration).asSeconds()
      await this.update()

      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
