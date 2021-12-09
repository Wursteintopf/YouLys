import { ChannelStatistic } from './ChannelStatistic'
import { Video } from './Video'
import { ChannelInterface } from '../../../shared/Domain/Model/ChannelInterface'
import { ChannelAveragePerformanceInterface, EMPTY_CHANNEL_AVERAGE_PERFORMANCE } from '../../../shared/Domain/Model/ChannelAveragePerformanceInterface'
import { connection } from '../../Helper/DatabaseHelper'
import moment from 'moment'
import { ChannelMeta } from './ChannelMeta'
import { ChannelRepository } from '../Repository/ChannelRepository'
import { VideoRepository } from '../Repository/VideoRepository'
import { callChannelStatistics, callFiftyNewestVideosOfChannel } from '../../YoutubeApiCaller/YoutubeApiCaller'
import { quantileSeq, min, max, mean } from 'mathjs'
import {
  SuccessResultsInterface,
  EMPTY_SUCCESS_RESULT, Result,
} from '../../../shared/Domain/Model/ChannelSuccessResultsInterface'
import { calculateFaceSuccess } from '../../SuccessCalculators/CalculateFaceSuccess'
import { calculateTitleSuccess } from '../../SuccessCalculators/CalculateTitleSuccess'

export class Channel implements ChannelInterface {
  channel_id: string
  created_at: Date = new Date()
  tracked = true
  statistics: ChannelStatistic[] = []
  videos: Video[] = []
  average_performance: ChannelAveragePerformanceInterface = EMPTY_CHANNEL_AVERAGE_PERFORMANCE
  success_results: SuccessResultsInterface = EMPTY_SUCCESS_RESULT

  constructor (props: ChannelInterface) {
    this.channel_id = props.channel_id
  }

  /**
   * Basics
   */

  public static setUpChannelTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS channel(' +
      'channel_id VARCHAR(30) NOT NULL,' +
      'created_at TIMESTAMP,' +
      'tracked BOOLEAN DEFAULT true NOT NULL,' +
      'PRIMARY KEY (channel_id)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  public setAll = (props): Channel => {
    this.channel_id = props.channel_id
    this.created_at = props.created_at
    this.tracked = props.tracked

    return this
  }

  protected create = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO channel(channel_id, created_at) VALUES (?, ?)',
        [this.channel_id, this.created_at],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  protected update = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'UPDATE channel SET created_at = ? WHERE channel_id = ?',
        [this.created_at, this.channel_id],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public save = async (): Promise<boolean> => {
    return ChannelRepository.Instance.getById(this.channel_id)
      .then(() => { return this.update() })
      .catch(() => { return this.create() })
  }

  public static convertQuery = (row) => {
    
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
            const stat = new ChannelStatistic(rows[0].channel_statistic_id)
            stat.setAll(rows[0])
            stat.channel_meta = new ChannelMeta(rows[0].channel_meta_id)
            stat.channel_meta.setAll(rows[0])
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
              const stat = new ChannelStatistic(row.channel_statistic_id)
              stat.setAll(row)
              stat.channel_meta = new ChannelMeta(row.channel_meta_id)
              stat.channel_meta.setAll(row)
              return stat
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
    return new Promise<boolean>((resolve, reject) => {
      VideoRepository.Instance.getByChannelAndUploadTime(this.channel_id, from, to)
        .then(videos => {
          this.videos = videos
          resolve(true)
        })
        .catch(() => resolve(false))
    })
  }

  public loadAveragePerformance = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'SELECT video_statistic.views, video_statistic.likes, video_statistic.dislikes, video_statistic.commentCount FROM video LEFT JOIN video_statistic ON video.video_id = video_statistic.video_id WHERE channel_id = ? AND DATE(timestamp) = (SELECT DATE(timestamp) FROM video_statistic WHERE video_id = video.video_id ORDER BY timestamp DESC LIMIT 1) ORDER BY upload_time DESC LIMIT 50',
        [this.channel_id],

        (err, rows) => {
          if (err) console.log(err)
          const views = rows.map(row => row.views)
          const likes = rows.map(row => row.likes)
          const commentCounts = rows.map(row => row.commentCount)

          this.average_performance = {
            views: {
              minimum: min(views),
              lowerQuantile: quantileSeq(views, 0.25) as number,
              median: quantileSeq(views, 0.5) as number,
              upperQuantile: quantileSeq(views, 0.75) as number,
              maximum: max(views),
            },
            likes: {
              minimum: min(likes),
              lowerQuantile: quantileSeq(likes, 0.25) as number,
              median: quantileSeq(likes, 0.5) as number,
              upperQuantile: quantileSeq(likes, 0.75) as number,
              maximum: max(likes),
            },
            commentCount: {
              minimum: min(commentCounts),
              lowerQuantile: quantileSeq(commentCounts, 0.25) as number,
              median: quantileSeq(commentCounts, 0.5) as number,
              upperQuantile: quantileSeq(commentCounts, 0.75) as number,
              maximum: max(commentCounts),
            },
          }
          resolve(true)
        },
      )
    })
  }

  public loadFiftyNewestVideos = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      VideoRepository.Instance.getFiftyNewestByChannel(this.channel_id)
        .then(videos => {
          this.videos = videos
          resolve(true)
        })
        .catch(e => reject(e))
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

      const apiResult = await callChannelStatistics(this.channel_id)

      let meta = new ChannelMeta(0)
      meta.username = apiResult.snippet.title
      meta.profile_picture = apiResult.snippet.thumbnails.high.url
      meta.description = apiResult.snippet.description
      meta.keywords = apiResult.brandingSettings.channel.keywords

      if (statsLoaded && meta.equals(this.statistics[0].channel_meta)) {
        meta = this.statistics[0].channel_meta
      } else {
        meta.channel_meta_id = await meta.save()
      }

      const stat = new ChannelStatistic(0)
      stat.channel_id = this.channel_id
      stat.channel_meta = meta
      stat.subscriber_count = apiResult.statistics.subscriberCount
      stat.subscriber_count_hidden = apiResult.statistics.hiddenSubscriberCount
      stat.trailer_video_id = apiResult.brandingSettings.channel.unsubscribedTrailer
      stat.video_count = apiResult.statistics.videoCount
      stat.view_count = apiResult.statistics.viewCount

      stat.success_factor = await this.calculateSuccessFactor()

      await stat.create()

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
        const video = new Video(result.snippet.resourceId.videoId)
        video.setAll({
          channel_id: this.channel_id,
          upload_time: new Date(result.snippet.publishedAt),
          duration: 0,
          statistics: [],
        })
        await video.save()
        return video
      }))

      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Calculate stuff
   */

  private calculateMean = (array: number[]) => {
    if (array.length > 0) return mean(array)
    else return null
  }

  private calculateMeanSuccessFromVideoArray = (array: Video[]) => {
    return this.calculateMean(array.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor))
  }

  public calculateSuccessFactor = async (): Promise<number> => {
    await this.loadFiftyNewestVideos()

    return this.calculateMeanSuccessFromVideoArray(this.videos)
  }

  public calculateSuccessResults = (): void => {
    this.success_results.amountOfVideosAnalyzed = this.videos.length
    this.success_results.faces = calculateFaceSuccess(this.videos)
    this.success_results.title = calculateTitleSuccess(this.videos)
  }
}
