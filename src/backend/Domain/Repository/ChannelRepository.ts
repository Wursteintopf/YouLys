import { connection } from '../../Helper/DatabaseHelper'
import { Channel } from '../Model/Channel'
import { ChannelStatistic } from '../Model/ChannelStatistic'
import { ChannelMeta } from '../Model/ChannelMeta'
import moment from 'moment'

export class ChannelRepository {
  private static instance: ChannelRepository

  protected setUpChannelTable = () => {
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

  protected setUpChannelMetaTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS channel_meta(' +
      'channel_meta_id INT NOT NULL AUTO_INCREMENT,' +
      'username VARCHAR(255),' +
      'profile_picture varchar(255),' +
      'description VARCHAR(5000),' +
      'keywords VARCHAR(1024),' +
      'PRIMARY KEY (channel_meta_id),' +
      'INDEX (username)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  protected setUpChannelStatisticsTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS channel_statistic(' +
      'channel_statistic_id INT NOT NULL AUTO_INCREMENT,' +
      'channel_id VARCHAR(30),' +
      'channel_meta_id INT,' +
      'subscriber_count INT,' +
      'subscriber_count_hidden BOOLEAN,' +
      'view_count INT,' +
      'video_count INT,' +
      'trailer_video_id VARCHAR(255),' +
      'timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
      'PRIMARY KEY (channel_statistic_id),' +
      'FOREIGN KEY (channel_id) REFERENCES channel(channel_id),' +
      'FOREIGN KEY (channel_meta_id) REFERENCES channel_meta(channel_meta_id) ON DELETE CASCADE,' +
      'INDEX (timestamp)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  private constructor () {
    this.setUpChannelTable()
    this.setUpChannelMetaTable()
    this.setUpChannelStatisticsTable()
  }

  public static get Instance () {
    return this.instance || (this.instance = new this())
  }

  /**
   * Methods to get Channels / Channelstatistics
   */

  public getById = async (channel_id: string): Promise<Channel> => {
    return new Promise<Channel>((resolve, reject) => {
      connection.query(
        'SELECT * FROM channel WHERE channel_id = ?',
        [channel_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows.length > 0) {
            const channel = new Channel(rows[0])
            resolve(channel)
          } else {
            reject(new Error('No Channel with this ID found.'))
          }
        },
      )
    })
  }

  public getAll = async (): Promise<Channel[]> => {
    return new Promise<Channel[]>((resolve, reject) => {
      connection.query(
        'SELECT * FROM channel WHERE tracked = true',

        (err, rows) => {
          if (err) reject(err)
          const channels: Channel[] = []
          rows.forEach(row => {
            channels.push(new Channel(row))
          })
          resolve(channels)
        },
      )
    })
  }

  /**
   * Methods to save/create/update/delete Channels / Channelstatistics
   */

  public saveMeta = async (channelMeta: ChannelMeta): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      connection.query(
        'INSERT INTO channel_meta(username, profile_picture, description, keywords) VALUES (?, ?, ?, ?)',
        [channelMeta.username, channelMeta.profile_picture, channelMeta.description, channelMeta.keywords],

        (err, rows) => {
          if (err) reject(err)
          if (!rows.insertId) reject(new Error("Unexpected Error. This shouldn't happen."))
          resolve(rows.insertId)
        },
      )
    })
  }

  public migrateStatistic = async (channelStatistic: ChannelStatistic): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO channel_statistic(channel_id, channel_meta_id, subscriber_count, subscriber_count_hidden, view_count, video_count, trailer_video_id, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [channelStatistic.channel_id, channelStatistic.channel_meta.channel_meta_id, channelStatistic.subscriber_count, channelStatistic.subscriber_count_hidden, channelStatistic.view_count, channelStatistic.video_count, channelStatistic.trailer_video_id, moment(channelStatistic.timestamp).format('YYYY-MM-DD HH:mm:ss')],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public saveStatistic = async (channelStatistic: ChannelStatistic): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO channel_statistic(channel_id, channel_meta_id, subscriber_count, subscriber_count_hidden, view_count, video_count, trailer_video_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [channelStatistic.channel_id, channelStatistic.channel_meta.channel_meta_id, channelStatistic.subscriber_count, channelStatistic.subscriber_count_hidden, channelStatistic.view_count, channelStatistic.video_count, channelStatistic.trailer_video_id],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  protected create = async (channel: Channel): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO channel(channel_id, created_at) VALUES (?, ?)',
        [channel.channel_id, channel.created_at],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  protected update = async (channel: Channel): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'UPDATE channel SET created_at = ? WHERE channel_id = ?',
        [channel.created_at, channel.channel_id],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public save = async (channel: Channel): Promise<boolean> => {
    return this.getById(channel.channel_id)
      .then(() => { return this.update(channel) })
      .catch(() => { return this.create(channel) })
  }

  public saveMultiple = async (channels: Channel[]): Promise<boolean> => {
    const promises = await Promise.all(channels.map(channel => {
      return this.save(channel)
    }))
    return !promises.includes(false)
  }
}
