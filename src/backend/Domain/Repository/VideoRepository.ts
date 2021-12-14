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

    stat.video_thumbnail = new VideoThumbnail(row.video_thumbnail_id)
    stat.video_thumbnail.setAll(row)

    video.statistics = [stat]

    return video
  }

  protected convertMultipleRows = (rows): Video[] => {
    return rows.reduce((videos, row) => {
      const video: Video = videos.find(v => v.video_id === row.video_id) || this.convertQueryRowToVideoModel(row)
      videos = videos.filter(v => v.video_id !== row.video_id)

      if (row.face_id) {
        const face = new Face(row.face_id)
        face.setAll(row)
        video.statistics[0].video_thumbnail.faces.push(face)
      }

      videos.push(video)

      return videos
    }, [])
  }

  private constructor () {
    Video.setUpVideoTable()
    VideoMeta.setUpVideoMetaTable()
    VideoThumbnail.setUpVideoThumbnailTable()
    VideoStatistic.setUpVideoStatisticTable()
    Face.setUpFaceTable()
  }

  public static get Instance (): VideoRepository {
    return this.instance || (this.instance = new this())
  }

  /**
   * Methods to get Videos
   */

  protected BASE_GET_QUERY = 'SELECT v.channel_id, v.upload_time, v.duration, vm.title, vm.description, vm.tags, vt.thumbnail, vs.*, f.face_id, f.height, f.width, f.x, f.y, f.expression, f.age, f.gender, f.gender_probability FROM video v LEFT JOIN video_statistic vs on v.video_id = vs.video_id LEFT JOIN video_meta vm ON vs.video_meta_id = vm.video_meta_id LEFT JOIN video_thumbnail vt ON vs.video_thumbnail_id = vt.video_thumbnail_id LEFT JOIN face f on vt.video_thumbnail_id = f.video_thumbnail_id '

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
        this.BASE_GET_QUERY + 'WHERE (upload_time BETWEEN ? AND ?) AND (DATE(timestamp) = (SELECT DATE(timestamp) FROM video_statistic WHERE video_id = v.video_id ORDER BY timestamp DESC LIMIT 1)) ORDER BY upload_time DESC',
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
        this.BASE_GET_QUERY + 'WHERE channel_id = ? AND (upload_time BETWEEN ? AND ?) AND (DATE(timestamp) = (SELECT DATE(timestamp) FROM video_statistic WHERE video_id = v.video_id ORDER BY timestamp DESC LIMIT 1)) ORDER BY upload_time DESC',
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

  public getFiftyNewestByChannel = async (channelId: string): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        this.BASE_GET_QUERY + 'WHERE channel_id = ? AND (timestamp = (SELECT timestamp FROM video_statistic WHERE video_id = v.video_id ORDER BY timestamp DESC LIMIT 1)) ORDER BY upload_time DESC LIMIT 50',
        [channelId],

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
}
