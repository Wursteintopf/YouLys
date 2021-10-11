import { connection } from '../../Helper/DatabaseHelper'
import { Channel } from '../Model/Channel'
import { ChannelStatistic } from '../Model/ChannelStatistic'

export class ChannelRepository {
  protected setUpChannelTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS channel(' +
      'channel_id VARCHAR(255) NOT NULL,' +
      'created_at TIMESTAMP,' +
      'PRIMARY KEY (channel_id)' +
      ')',

      err => {
        if (err) console.log(err)
      },
    )
  }

  protected setUpChannelStatisticsTable = () => {
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
        if (err) console.log(err)
      },
    )
  }

  constructor () {
    this.setUpChannelTable()
    this.setUpChannelStatisticsTable()
  }

  /**
   * Methods to get Channels / Channelstatistics
   */

  public getById = (channel_id: string): Promise<Channel> => {
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
            reject(new Error('There is no Channel with this ID'))
          }
        },
      )
    })
  }

  public getAll = (): Promise<Channel[]> => {
    return new Promise<Channel[]>((resolve, reject) => {
      connection.query(
        'SELECT * FROM channel',

        (err, rows) => {
          if (err) reject(err)
          const channels: Channel[] = []
          rows.forEach(row => {
            const channel = new Channel(row)
            channels.push(channel)
          })
          resolve(channels)
        },
      )
    })
  }

  /**
   * Methods to save/create/update/delete Channels / Channelstatistics
   */

  protected create = (channel: Channel): Promise<boolean> => {
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

  protected update = (channel: Channel): Promise<boolean> => {
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

  public save = (channel: Channel): Promise<boolean> => {
    return this.getById(channel.channel_id)
      .then(() => { return this.update(channel) })
      .catch(() => { return this.create(channel) })
  }

  public saveMultiple = (channels: Channel[]): Promise<boolean[]> => {
    return Promise.all(channels.map(channel => {
      return this.save(channel)
    }))
  }

  public saveStatistic = (channelStatistic: ChannelStatistic): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO channel_statistic(channel_id, username, profile_picture, description, subscriber_count, subscriber_count_hidden, view_count, video_count, made_for_kids, trailer_video, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [channelStatistic.channel_id, channelStatistic.username, channelStatistic.profile_picture, channelStatistic.description, channelStatistic.subscriber_count, channelStatistic.subscriber_count_hidden, channelStatistic.view_count, channelStatistic.video_count, channelStatistic.made_for_kids, channelStatistic.trailer_video, channelStatistic.keywords],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public delete = (channel: Channel): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'DELETE FROM channel WHERE channel_id = ?',
        [channel.channel_id],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }
}
