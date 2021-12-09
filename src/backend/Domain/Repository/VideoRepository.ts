import { connection } from '../../Helper/DatabaseHelper'
import { Video } from '../Model/Video'
import { VideoStatistic } from '../Model/VideoStatistic'
import { VideoMeta } from '../Model/VideoMeta'
import { VideoThumbnail } from '../Model/VideoThumbnail'
import { Face } from '../Model/Face'

export class VideoRepository {
  private static instance: VideoRepository

  protected convertQueryRowToVideoModel = async (row): Promise<Video> => {
    const video = new Video(row.video_id)
    video.setAll(row)

    const stat = new VideoStatistic(row.video_statistic_id)
    stat.setAll(row)

    stat.video_meta = new VideoMeta(row.video_meta_id)
    stat.video_meta.setAll(row)

    stat.video_thumbnail = new VideoThumbnail(row.video_thumbnail_id)
    stat.video_thumbnail.setAll(row)
    await stat.video_thumbnail.loadFaces()

    video.statistics = [stat]

    return video
  }

  protected convertMultipleRows = async (rows): Promise<Video[]> => {
    return await Promise.all(rows.map(row => this.convertQueryRowToVideoModel(row)))
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

        async (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            resolve(await this.convertQueryRowToVideoModel(rows[0]))
          } else {
            reject(new Error('There is no Video with this ID'))
          }
        },
      )
    })
  }

  public getByUploadTime = async (from: Date, to: Date): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT video.channel_id, video.upload_time, video.duration, video_meta.title, video_meta.description, video_meta.tags, video_thumbnail.thumbnail, video_statistic.* FROM video LEFT JOIN video_statistic on video.video_id = video_statistic.video_id LEFT JOIN video_meta ON video_statistic.video_meta_id = video_meta.video_meta_id LEFT JOIN video_thumbnail ON video_statistic.video_thumbnail_id = video_thumbnail.video_thumbnail_id WHERE (upload_time BETWEEN ? AND ?) AND (DATE(timestamp) = (SELECT DATE(timestamp) FROM video_statistic WHERE video_id = video.video_id ORDER BY timestamp DESC LIMIT 1)) ORDER BY upload_time DESC',
        [from, to],

        async (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            resolve(await this.convertMultipleRows(rows))
          } else {
            reject(new Error('No Videos in that timespan found'))
          }
        },
      )
    })
  }

  public getByChannelAndUploadTime = async (channelId: string, from: Date, to: Date): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT video.channel_id, video.upload_time, video.duration, video_meta.title, video_meta.description, video_meta.tags, video_thumbnail.thumbnail, video_statistic.* FROM video LEFT JOIN video_statistic on video.video_id = video_statistic.video_id LEFT JOIN video_meta ON video_statistic.video_meta_id = video_meta.video_meta_id LEFT JOIN video_thumbnail ON video_statistic.video_thumbnail_id = video_thumbnail.video_thumbnail_id WHERE channel_id = ? AND (upload_time BETWEEN ? AND ?) AND (DATE(timestamp) = (SELECT DATE(timestamp) FROM video_statistic WHERE video_id = video.video_id ORDER BY timestamp DESC LIMIT 1)) ORDER BY upload_time DESC',
        [channelId, from, to],

        async (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            resolve(await this.convertMultipleRows(rows))
          } else {
            reject(new Error('No Videos for the Channel with ChannelId ' + channelId + ' found'))
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

        async (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            resolve(await this.convertMultipleRows(rows))
          } else {
            reject(new Error('No Videos for this ChannelId found'))
          }
        },
      )
    })
  }
}
