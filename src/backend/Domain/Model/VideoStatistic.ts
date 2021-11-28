import { VideoStatisticInterface } from '../../../shared/Domain/Model/VideoStatisticInterface'
import { VideoMeta } from './VideoMeta'
import { VideoThumbnail } from './VideoThumbnail'
import { connection } from '../../Helper/DatabaseHelper'

export class VideoStatistic implements VideoStatisticInterface {
  video_statistic_id: number
  video_id = ''
  video_meta: VideoMeta = new VideoMeta(0)
  video_thumbnail: VideoThumbnail = new VideoThumbnail(0)
  views = 0
  likes = 0
  favouriteCount = 0
  commentCount = 0
  timestamp: Date = new Date()
  success_factor = 4

  constructor (props: VideoStatisticInterface) {
    this.video_statistic_id = props.video_statistic_id
  }

  /**
   * Basics
   */

  public static setUpVideoStatisticTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video_statistic(' +
      'video_statistic_id INT NOT NULL AUTO_INCREMENT,' +
      'video_id VARCHAR(30),' +
      'video_meta_id INT,' +
      'video_thumbnail_id INT,' +
      'views INT,' +
      'likes INT,' +
      'favouriteCount INT,' +
      'commentCount INT,' +
      'timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
      'success_factor FLOAT,' +
      'PRIMARY KEY (video_statistic_id),' +
      'FOREIGN KEY (video_id) REFERENCES video(video_id),' +
      'FOREIGN KEY (video_meta_id) REFERENCES video_meta(video_meta_id),' +
      'FOREIGN KEY (video_thumbnail_id) REFERENCES video_thumbnail(video_thumbnail_id),' +
      'INDEX (timestamp)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  public setAll = (props): VideoStatistic => {
    this.video_id = props.video_id
    this.views = props.views
    this.likes = props.likes
    this.favouriteCount = props.favouriteCount
    this.commentCount = props.commentCount
    this.timestamp = props.timestamp
    this.success_factor = props.success_factor

    if (props.video_meta) {
      this.video_meta = new VideoMeta(props.video_meta.video_meta_id)
      this.video_meta.setAll(props.video_meta)
    } else this.video_meta = new VideoMeta(0)

    if (props.video_thumbnail) {
      this.video_thumbnail = new VideoThumbnail(props.video_thumbnail.video_thumbnail_id)
      this.video_thumbnail.setAll(props.video_thumbnail)
    } else this.video_thumbnail = new VideoThumbnail(0)

    return this
  }

  public save = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO video_statistic(video_id, video_meta_id, video_thumbnail_id, views, likes, favouriteCount, commentCount, success_factor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [this.video_id, this.video_meta.video_meta_id, this.video_thumbnail.video_thumbnail_id, this.views, this.likes, this.favouriteCount, this.commentCount, this.success_factor],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }
}
