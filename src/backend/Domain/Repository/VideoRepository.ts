import { connection } from '../../Helper/DatabaseHelper'
import { Video } from '../Model/Video'
import { Channel } from '../Model/Channel'
import { VideoStatistic } from '../Model/VideoStatistic'

export class VideoRepository {
  protected setUpVideoTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video(' +
      'video_id VARCHAR(255) NOT NULL,' +
      'channel_id VARCHAR(255),' +
      'upload_time TIMESTAMP,' +
      'duration INT,' +
      'PRIMARY KEY (video_id),' +
      'FOREIGN KEY (channel_id) REFERENCES channel(channel_id)' +
      ')',

      err => {
        if (err) console.log(err)
      },
    )
  }

  protected setUpVideoStatisticTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video_statistic(' +
      'video_statistic_id INT NOT NULL AUTO_INCREMENT,' +
      'video_id VARCHAR(255),' +
      'views VARCHAR(255),' +
      'title VARCHAR(255),' +
      'thumbnail VARCHAR(255),' +
      'description VARCHAR(5000),' +
      'tags VARCHAR(1024),' +
      'likes INT,' +
      'dislikes INT,' +
      'favouriteCount INT,' +
      'commentCount INT,' +
      'timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
      'PRIMARY KEY (video_statistic_id),' +
      'FOREIGN KEY (video_id) REFERENCES video(video_id)' +
      ')',

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

  constructor () {
    this.setUpVideoTable()
    this.setUpVideoStatisticTable()
  }

  /**
   * Methods to get Videos / Videostatistics
   */

  public getById = (video_id: string): Promise<Video> => {
    return new Promise<Video>((resolve, reject) => {
      connection.query(
        'SELECT * FROM video WHERE video_id = ?',
        [video_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows.length > 1) {
            resolve(this.convertQueryRowsToVideoModel(rows)[0])
          } else {
            reject(new Error('There is no Video with this ID'))
          }
        },
      )
    })
  }

  public getAll = (): Promise<Video[]> => {
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

  public getByChannel = (channel: Channel | string): Promise<Video[]> => {
    const channelId = channel instanceof Channel ? channel.channel_id : channel

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

  public getFiftyNewestByChannel = (channel: Channel | string): Promise<Video[]> => {
    const channelId = channel instanceof Channel ? channel.channel_id : channel

    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT * FROM video WHERE channel_id = ? ORDER BY upload_time DESC LIMIT 50',
        [channelId],

        (err, rows) => {
          if (err) reject(err)
          resolve(this.convertQueryRowsToVideoModel(rows))
        },
      )
    })
  }

  public getByChannelInRangeWithNewestStats = (channelId: string, from: Date, to: Date): Promise<Video[]> => {
    return new Promise<Video[]>((resolve, reject) => {
      connection.query(
        'SELECT video.channel_id, video.duration, video.upload_time, video_statistic.* FROM video LEFT JOIN video_statistic ON video.video_id = video_statistic.video_id WHERE channel_id = ? AND (upload_time BETWEEN ? AND ?) AND DATE(timestamp) = (SELECT DATE(timestamp) FROM video_statistic ORDER BY timestamp DESC LIMIT 1) ORDER BY upload_time DESC',
        [channelId, from, to],

        (err, rows) => {
          if (err) reject(err)
          resolve(Promise.all(rows.map(row => {
            const video = new Video(row)
            const statistic = new VideoStatistic(row)
            video.statistics = [statistic]
            return video
          })))
        },
      )
    })
  }

  /**
   * Methods to save/create/update Videos / Videostatistics
   */

  protected create = (video: Video): Promise<boolean> => {
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

  protected update = (video: Video): Promise<boolean> => {
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

  public saveStatistic = (videoStatistic: VideoStatistic): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO video_statistic(video_id, views, title, thumbnail, description, tags, likes, dislikes, favouriteCount, commentCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [videoStatistic.video_id, videoStatistic.views, videoStatistic.title, videoStatistic.thumbnail, videoStatistic.description, videoStatistic.tags, videoStatistic.likes, videoStatistic.dislikes, videoStatistic.favouriteCount, videoStatistic.commentCount],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public delete = (video: Video): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'DELETE FROM video WHERE video_id = ?',
        [video.video_id],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }
}
