import { connection } from '../../Helper/DatabaseHelper'
import { Video } from '../Model/Video'
import { VideoStatistic } from '../Model/VideoStatistic'
import { VideoMeta } from '../Model/VideoMeta'
import { VideoThumbnail } from '../Model/VideoThumbnail'
import { Face } from '../Model/Face'

export class VideoRepository {
  private static instance: VideoRepository

  protected convertQueryRowsToVideoModel = (rows): Video[] => {
    return rows.map(row => {
      const video = new Video(row.video_id)
      video.setAll(row)
      return video
    })
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
   * Methods to get Videos / Videostatistics
   */

  public getById = async (video_id: string): Promise<Video> => {
    return new Promise<Video>((resolve, reject) => {
      connection.query(
        'SELECT * FROM video WHERE video_id = ?',
        [video_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows.length > 0) {
            const video = new Video(rows[0].video_id)
            video.setAll(rows[0])
            resolve(video)
          } else {
            reject(new Error('There is no Video with this ID'))
          }
        },
      )
    })
  }

  public getAll = async (): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT * FROM video',

        (err, rows) => {
          if (err) reject(err)
          resolve(this.convertQueryRowsToVideoModel(rows))
        },
      )
    })
  }

  public getByChannelId = async (channelId: string): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT * FROM video WHERE channel_id = ?',
        [channelId],

        (err, rows) => {
          if (err) reject(err)
          resolve(this.convertQueryRowsToVideoModel(rows))
        },
      )
    })
  }

  public getByChannelAndUploadTime = async (channelId: string, from: Date, to: Date): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT * FROM video WHERE channel_id = ? AND (upload_time BETWEEN ? AND ?) ORDER BY upload_time DESC',
        [channelId, from, to],

        (err, rows) => {
          if (err) reject(err)
          resolve(this.convertQueryRowsToVideoModel(rows))
        },
      )
    })
  }
}
