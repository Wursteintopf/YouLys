import { Channel } from '../Model/Channel'
import { connection } from '../Helper/DatabaseHelper'
import { ChannelStatistic } from '../Model/ChannelStatistic'

export const setUpChannelTable = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS channel(' +
        'channel_id VARCHAR(255) NOT NULL,' +
        'created_at TIMESTAMP,' +
        'PRIMARY KEY (channel_id)' +
      ')',

      err => {
        if (err) reject(err)
        resolve(true)
      },
    )
  })
}

export const setUpChannelStatisticsTable = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS channel_statistic(' +
        'channel_statistic_id INT NOT NULL AUTO_INCREMENT,' +
        'channel_id VARCHAR(255),' +
        'username VARCHAR(255),' +
        'profile_picture VARCHAR(255),' +
        'description VARCHAR(5000),' +
        'subscriber_count INT,' +
        'subscriber_count_hidden boolean,' +
        'view_count INT,' +
        'video_count INT,' +
        'made_for_kids boolean,' +
        'trailer_video VARCHAR(255),' +
        'keywords VARCHAR(1024),' +
        'timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
        'PRIMARY KEY (channel_statistic_id),' +
        'FOREIGN KEY (channel_id) REFERENCES channel(channel_id)' +
      ')',

      err => {
        if (err) reject(err)
        resolve(true)
      },
    )
  })
}

export const getChannelList = (): Promise<Channel[]> => {
  return new Promise<Channel[]>((resolve, reject) => {
    connection.query(
      'SELECT * FROM channel',

      (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      },
    )
  })
}

export const createChannel = (channel: Channel): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query(
      'INSERT INTO channel(channel_id, created_at) VALUES (?, ?)',
      [channel.channelId, channel.createdAt],

      err => {
        if (err) reject(err)
        resolve(true)
      },
    )
  })
}

export const createChannelStatistic = (channelStatistic: ChannelStatistic): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query(
      'INSERT INTO channel_statistic(channel_id, username, profile_picture, description, subscriber_count, subscriber_count_hidden, view_count, video_count, made_for_kids, trailer_video, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [channelStatistic.channelId, channelStatistic.username, channelStatistic.profilePicture, channelStatistic.description, channelStatistic.subscriberCount, channelStatistic.subscriberCountHidden, channelStatistic.viewCount, channelStatistic.videoCount, channelStatistic.madeForKids, channelStatistic.trailerVideo, channelStatistic.keywords],

      err => {
        if (err) reject(err)
        resolve(true)
      },
    )
  })
}

export const getChannel = (channel: Channel): Promise<Channel> => {
  return new Promise<Channel>((resolve, reject) => {
    connection.query(
      'SELECT * FROM channel WHERE channel_id = ?',
      [channel.channelId],

      (err, rows) => {
        if (err) reject(err)
        resolve(rows[0])
      },
    )
  })
}

export const getChannelById = (channelId: string): Promise<Channel> => {
  return new Promise<Channel>((resolve, reject) => {
    getChannel(new Channel(channelId))
      .then(channel => resolve(channel))
      .catch(err => reject(err))
  })
}

export const updateChannel = (channel: Channel): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query(
      'UPDATE channel SET created_at = ? WHERE channel_id = ?',
      [channel.createdAt, channel.channelId],

      err => {
        if (err) reject(err)
        resolve(true)
      },
    )
  })
}

export const deleteChannel = (channel: Channel): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query(
      'DELETE FROM channel WHERE channel_id = ?',
      [channel.channelId],

      err => {
        if (err) reject(err)
        resolve(true)
      },
    )
  })
}

export const deleteChannelById = (channelId: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    deleteChannel(new Channel(channelId))
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}
