import { connection } from '../../Helper/DatabaseHelper'
import { Video } from '../Model/Video'
import { VideoStatistic } from '../Model/VideoStatistic'
import { VideoMeta } from '../Model/VideoMeta'
import { VideoThumbnail } from '../Model/VideoThumbnail'
import { Face } from '../Model/Face'

export class VideoRepository {
  private static instance: VideoRepository

  protected convertQueryRowToVideoModel = (row): Video => {
    const video = new Video(row.video_id)
    video.setAll(row)

    const stat = new VideoStatistic(row.video_statistic_id)
    stat.setAll(row)

    stat.video_meta = new VideoMeta(row.video_meta_id)
    stat.video_meta.setAll(row)

    video.statistics = [stat]

    return video
  }

  protected convertMultipleRows = (rows): Video[] => {
    return rows.map(row => this.convertQueryRowToVideoModel(row))
  }

  private constructor () {
    Video.setUpVideoTable()
    VideoMeta.setUpVideoMetaTable()
    VideoThumbnail.setUpVideoThumbnailTable()
    VideoStatistic.setUpVideoStatisticTable()
    Face.setUpFaceTable()
  }

  public static get Instance () {
    return this.instance || (this.instance = new this())
  }

  /**
   * Methods to get Videos
   */

  public getById = async (video_id: string): Promise<Video> => {
    return new Promise<Video>((resolve, reject) => {
      connection.query(
        'SELECT * FROM video WHERE video_id = ?',
        [video_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            resolve(this.convertQueryRowToVideoModel(rows[0]))
          } else {
            reject(new Error('There is no Video with this ID'))
          }
        },
      )
    })
  }

  public getByChannelAndUploadTime = async (channelId: string, from: Date, to: Date): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT video.channel_id, video.upload_time, video.duration, video_meta.title, video_meta.description, video_meta.tags, video_statistic.* FROM video LEFT JOIN video_statistic on video.video_id = video_statistic.video_id LEFT JOIN video_meta ON video_statistic.video_meta_id = video_meta.video_meta_id WHERE channel_id = ? AND (upload_time BETWEEN ? AND ?) ORDER BY upload_time DESC',
        [channelId, from, to],

        (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            resolve(this.convertMultipleRows(rows))
          } else {
            reject(new Error('No Videos for this ChannelId found'))
          }
        },
      )
    })
  }

  public getFiftyNewestByChannel = async (channel_id: string): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT video.channel_id, video.upload_time, video.duration, video_meta.title, video_meta.description, video_meta.tags, video_statistic.* FROM video LEFT JOIN video_statistic on video.video_id = video_statistic.video_id LEFT JOIN video_meta ON video_statistic.video_meta_id = video_meta.video_meta_id WHERE channel_id = ? AND (timestamp = (SELECT timestamp FROM video_statistic WHERE video_id = video.video_id ORDER BY timestamp DESC LIMIT 1)) ORDER BY upload_time DESC LIMIT 50',
        [channel_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            resolve(this.convertMultipleRows(rows))
          } else {
            reject(new Error('No Videos for this ChannelId found'))
          }
        },
      )
    })
  }
}
