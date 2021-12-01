import { connection } from '../../Helper/DatabaseHelper'
import { Channel } from '../Model/Channel'
import { ChannelMeta } from '../Model/ChannelMeta'
import { ChannelStatistic } from '../Model/ChannelStatistic'

export class ChannelRepository {
  private static instance: ChannelRepository

  private constructor () {
    Channel.setUpChannelTable()
    ChannelMeta.setUpChannelMetaTable()
    ChannelStatistic.setUpChannelStatisticsTable()
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
            const channel = new Channel(rows[0].channel_id)
            channel.setAll(rows[0])
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
            const channel = new Channel(row.channel_id)
            channel.setAll(row)
            channels.push(channel)
          })
          resolve(channels)
        },
      )
    })
  }

  /**
   * Methods to save/create/update
   */

  public saveMultipleChannels = async (channels: Channel[]): Promise<boolean> => {
    const promises = await Promise.all(channels.map(channel => {
      return channel.save()
    }))
    return !promises.includes(false)
  }
}
