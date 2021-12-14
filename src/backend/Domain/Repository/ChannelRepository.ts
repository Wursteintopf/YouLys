import { connection } from '../../Helper/DatabaseHelper'
import { Channel } from '../Model/Channel'
import { ChannelMeta } from '../Model/ChannelMeta'
import { ChannelStatistic } from '../Model/ChannelStatistic'
import { Video } from '../Model/Video'
import { VideoStatistic } from '../Model/VideoStatistic'
import { VideoMeta } from '../Model/VideoMeta'
import { VideoThumbnail } from '../Model/VideoThumbnail'

export class ChannelRepository {
  private static instance: ChannelRepository

  protected convertQueryRowToChannelModel = (row): Channel => {
    const channel = new Channel(row.channel_id)
    channel.setAll(row)

    const stat = new ChannelStatistic(row.channel_statistic_id)
    stat.setAll(row)

    const meta = new ChannelMeta(row.channel_meta_id)
    meta.setAll(row)

    stat.channel_meta = meta

    channel.statistics = [stat]

    return channel
  }

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
        'SELECT c.created_at, c.tracked, cm.username, cm.profile_picture, cm.description, cm.keywords, cs.* FROM channel c LEFT JOIN channel_statistic cs ON c.channel_id = cs.channel_id LEFT JOIN channel_meta cm on cs.channel_meta_id = cm.channel_meta_id WHERE tracked = true AND (DATE(timestamp) = (SELECT DATE(timestamp) FROM channel_statistic WHERE channel_id = c.channel_id ORDER BY timestamp DESC LIMIT 1))',

        (err, rows) => {
          if (err) reject(err)
          resolve(rows.map(row => this.convertQueryRowToChannelModel(row)))
        },
      )
    })
  }

  public getAllWithoutStats = async (): Promise<Channel[]> => {
    return new Promise<Channel[]>((resolve, reject) => {
      connection.query(
        'SELECT * FROM channel WHERE tracked = true',

        (err, rows) => {
          if (err) reject(err)
          resolve(rows.map(row => {
            const channel = new Channel(row.channel_id)
            channel.setAll(row)
            return channel
          }))
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
