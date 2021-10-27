import { connection } from '../../Helper/DatabaseHelper'
import { Video } from '../Model/Video'
import { VideoStatistic } from '../Model/VideoStatistic'
import { VideoMeta } from '../Model/VideoMeta'
import { VideoThumbnail } from '../Model/VideoThumbnail'
import moment from 'moment'
import { Face } from '../Model/Face'

export class VideoRepository {
  private static instance: VideoRepository

  protected setUpVideoTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video(' +
      'video_id VARCHAR(30) NOT NULL,' +
      'channel_id VARCHAR(30),' +
      'upload_time TIMESTAMP,' +
      'duration INT,' +
      'PRIMARY KEY (video_id),' +
      'FOREIGN KEY (channel_id) REFERENCES channel(channel_id),' +
      'INDEX (upload_time)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  protected setUpVideoMetaTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video_meta(' +
      'video_meta_id INT NOT NULL AUTO_INCREMENT,' +
      'title VARCHAR(255),' +
      'description VARCHAR(5000),' +
      'tags VARCHAR(1024),' +
      'PRIMARY KEY (video_meta_id),' +
      'INDEX (title)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  protected setUpVideoThumbnailTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video_thumbnail(' +
      'video_thumbnail_id INT NOT NULL AUTO_INCREMENT,' +
      'thumbnail VARCHAR(255),' +
      'PRIMARY KEY (video_thumbnail_id)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  protected setUpVideoStatisticTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video_statistic(' +
      'video_statistic_id INT NOT NULL AUTO_INCREMENT,' +
      'video_id VARCHAR(30),' +
      'video_meta_id INT,' +
      'video_thumbnail_id INT,' +
      'views INT,' +
      'likes INT,' +
      'dislikes INT,' +
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

  protected convertQueryRowsToVideoModel = (rows): Video[] => {
    const videos: Video[] = []
    rows.forEach(row => {
      videos.push(new Video(row))
    })
    return videos
  }

  private constructor () {
    this.setUpVideoTable()
    this.setUpVideoMetaTable()
    this.setUpVideoThumbnailTable()
    this.setUpVideoStatisticTable()
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
            const video = new Video(rows[0])
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
          resolve(rows.map(row => new Video(row)))
        },
      )
    })
  }

  /**
   * Methods to save/create/update Videos / Videostatistics
   */

  public saveMeta = async (videoMeta: VideoMeta): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      connection.query(
        'INSERT INTO video_meta(title, description, tags) VALUES (?, ?, ?)',
        [videoMeta.title, videoMeta.description, videoMeta.tags],

        (err, rows) => {
          if (err) reject(err)
          if (!rows.insertId) reject(new Error("Unexpected Error. This shouldn't happen."))
          resolve(rows.insertId)
        },
      )
    })
  }

  public saveThumbnail = async (videoThumbnail: VideoThumbnail): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      connection.query(
        'INSERT INTO video_thumbnail(thumbnail) VALUES (?)',
        [videoThumbnail.thumbnail],

        (err, rows) => {
          if (err) reject(err)
          if (!rows.insertId) reject(new Error("Unexpected Error. This shouldn't happen."))
          resolve(rows.insertId)
        },
      )
    })
  }

  public migrateStatistic = async (videoStatistic: VideoStatistic): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO video_statistic(video_id, video_meta_id, video_thumbnail_id, views, likes, dislikes, favouriteCount, commentCount, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [videoStatistic.video_id, videoStatistic.video_meta.video_meta_id, videoStatistic.video_thumbnail.video_thumbnail_id, videoStatistic.views, videoStatistic.likes, videoStatistic.dislikes, videoStatistic.favouriteCount, videoStatistic.commentCount, moment(videoStatistic.timestamp).format('YYYY-MM-DD HH:mm:ss')],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public saveStatistic = async (videoStatistic: VideoStatistic): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO video_statistic(video_id, video_meta_id, video_thumbnail_id, views, likes, dislikes, favouriteCount, commentCount, success_factor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [videoStatistic.video_id, videoStatistic.video_meta.video_meta_id, videoStatistic.video_thumbnail.video_thumbnail_id, videoStatistic.views, videoStatistic.likes, videoStatistic.dislikes, videoStatistic.favouriteCount, videoStatistic.commentCount, videoStatistic.success_factor],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public create = (video: Video): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO video(video_id, channel_id, upload_time, duration) VALUES (?, ?, ?, ?)',
        [video.video_id, video.channel_id, video.upload_time, video.duration],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public update = (video: Video): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'UPDATE video SET upload_time = ?, duration = ? WHERE video_id = ?',
        [video.upload_time, video.duration, video.video_id],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public save = (video: Video): Promise<boolean> => {
    return this.getById(video.video_id)
      .then(() => { return this.update(video) })
      .catch(() => { return this.create(video) })
  }
}
