import { ChannelStatistic } from './ChannelStatistic'
import { Video } from './Video'
import { ChannelInterface } from '../../../shared/Domain/Model/ChannelInterface'
import { connection } from '../../Helper/DatabaseHelper'
import moment from 'moment'
import { ChannelMeta } from './ChannelMeta'
import { ChannelRepository } from '../Repository/ChannelRepository'
import { VideoRepository } from '../Repository/VideoRepository'
import { callChannelStatistics, callFiftyNewestVideosOfChannel } from '../../YoutubeApiCaller/YoutubeApiCaller'

export class Channel implements ChannelInterface {
  channel_id: string
  created_at: Date
  statistics: ChannelStatistic[]
  videos: Video[]
  tracked: boolean

  constructor (props: ChannelInterface) {
    this.channel_id = props.channel_id
    this.created_at = props.created_at
    this.tracked = props.tracked

    if (props.statistics) this.statistics = props.statistics.map(stat => new ChannelStatistic(stat))
    else this.statistics = []

    if (props.videos) this.videos = props.videos.map(video => new Video(video))
    else this.videos = []
  }

  public save = async (): Promise<boolean> => {
    return ChannelRepository.Instance.save(this)
  }

  /**
   * Load Data from Database
   */

  public loadNewestStats = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'SELECT channel_meta.username, channel_meta.profile_picture, channel_meta.description, channel_meta.keywords, channel_statistic.* FROM channel_statistic LEFT JOIN channel_meta ON channel_statistic.channel_meta_id = channel_meta.channel_meta_id WHERE channel_id = ? AND DATE(timestamp) = (SELECT DATE(timestamp) FROM channel_statistic ORDER BY timestamp DESC LIMIT 1)',
        [this.channel_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            const stat = new ChannelStatistic(rows[0])
            stat.channel_meta = new ChannelMeta(rows[0])
            this.statistics = [stat]
            resolve(true)
          } else {
            reject(new Error('Unable to load newest channel stats. No stats found.'))
          }
        },
      )
    })
  }

  public loadStatsInRange = async (from: Date, to: Date): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'SELECT channel_meta.username, channel_meta.profile_picture, channel_meta.description, channel_meta.keywords, channel_statistic.* FROM channel_statistic LEFT JOIN channel_meta ON channel_statistic.channel_meta_id = channel_meta.channel_meta_id WHERE channel_id = ? AND (timestamp BETWEEN ? AND ?) ORDER BY timestamp DESC',
        [this.channel_id, moment(from).format('YYYY-MM-DD HH:mm:ss'), moment(to).format('YYYY-MM-DD HH:mm:ss')],

        async (err, rows) => {
          if (err) reject(err)
          if (rows.length > 0) {
            this.statistics = rows.map(row => {
              const statistic = new ChannelStatistic(row)
              statistic.channel_meta = new ChannelMeta(row)
              return statistic
            })
            resolve(true)
          } else {
            reject(new Error('Unable to load channel stats in Range. No stats found.'))
          }
        },
      )
    })
  }

  public loadVideosByUploadTime = async (from: Date, to: Date): Promise<boolean> => {
    this.videos = await VideoRepository.Instance.getByChannelAndUploadTime(this.channel_id, from, to)
    const promises = await Promise.all(this.videos.map(video => video.loadNewestStats()))
    return (!promises.includes(false))
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

      const apiResult = await callChannelStatistics(this.channel_id)

      let meta = new ChannelMeta({
        channel_meta_id: 0,
        username: apiResult.snippet.title,
        profile_picture: apiResult.snippet.thumbnails.high.url,
        description: apiResult.snippet.description,
        keywords: apiResult.brandingSettings.channel.keywords,
      })

      if (statsLoaded && meta.equals(this.statistics[0].channel_meta)) {
        meta = this.statistics[0].channel_meta
      } else {
        meta.channel_meta_id = await ChannelRepository.Instance.saveMeta(meta)
      }

      const stat = new ChannelStatistic({
        channel_statistic_id: 0,
        channel_id: this.channel_id,
        channel_meta: meta,
        subscriber_count: apiResult.statistics.subscriberCount,
        subscriber_count_hidden: apiResult.statistics.hiddenSubscriberCount,
        timestamp: new Date(),
        trailer_video_id: apiResult.brandingSettings.channel.unsubscribedTrailer,
        video_count: apiResult.statistics.videoCount,
        view_count: apiResult.statistics.viewCount,
      })

      await ChannelRepository.Instance.saveStatistic(stat)

      this.created_at = new Date(apiResult.snippet.publishedAt)
      await this.save()

      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public callFiftyNewestVideos = async (): Promise<boolean> => {
    try {
      const apiResults = await callFiftyNewestVideosOfChannel(this.channel_id)

      this.videos = await Promise.all(apiResults.map(async result => {
        const video = new Video({
          video_id: result.snippet.resourceId.videoId,
          channel_id: this.channel_id,
          upload_time: new Date(result.snippet.publishedAt),
          duration: 0,
          statistics: [],
        })
        await VideoRepository.Instance.save(video)
        return video
      }))

      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
