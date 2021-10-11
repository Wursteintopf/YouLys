import { connection } from '../Helper/DatabaseHelper'
import { Channel } from '../Model/Channel'
import { Video } from '../Model/Video'
import { ChannelStatistic } from '../Model/ChannelStatistic'
import { VideoStatistic } from '../Model/VideoStatistic'

export const setUpVideoTable = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
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
        if (err) reject(err)
        resolve(true)
      },
    )
  })
}

export const setUpVideoStatisticTable = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
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
        if (err) reject(err)
        resolve(true)
      },
    )
  })
}

export const getVideoList = (): Promise<Video[]> => {
  return new Promise<Video[]>((resolve, reject) => {
    connection.query(
      'SELECT * FROM video',

      (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      },
    )
  })
}

export const getVideoListByChannel = (channel: Channel | string): Promise<Video[]> => {
  const channelId = channel instanceof Channel ? channel.channel_id : channel

  return new Promise<Video[]>((resolve, reject) => {
    connection.query(
      'SELECT * FROM video WHERE channel_id = ?',
      [channelId],

      (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      },
    )
  })
}

export const getFiftyNewestVideosByChannel = (channel: Channel | string): Promise<Video[]> => {
  const channelId = channel instanceof Channel ? channel.channel_id : channel

  return new Promise<Video[]>((resolve, reject) => {
    connection.query(
      'SELECT * FROM video WHERE channel_id = ? ORDER BY upload_time DESC LIMIT 50',
      [channelId],

      (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      },
    )
  })
}

export const createVideo = (video: Video): Promise<boolean> => {
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

export const createVideoStatistic = (videoStatistic: VideoStatistic): Promise<boolean> => {
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
