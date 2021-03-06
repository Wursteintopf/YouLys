import { connection, reInitConnection } from '../../Helper/DatabaseHelper'
import { Channel } from '../Model/Channel'
import { ChannelMeta } from '../Model/ChannelMeta'
import { ChannelStatistic } from '../Model/ChannelStatistic'
import { Video } from '../Model/Video'
import { Face } from '../Model/Face'
import { VideoRepository } from './VideoRepository'
import { ApiStatusCodes } from '../../../shared/Enums/ApiStatusCodes'
import { ClickbaitObject } from '../Model/ClickbaitObject'

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

  protected convertMultipleRows = (rows): Channel[] => {
    return rows.reduce((channels, row) => {
      const channel: Channel = channels.find(c => c.channel_id === row.channel_id) || this.convertQueryRowToChannelModel(row)
      channels = channels.filter(c => c.channel_id !== row.channel_id)

      const video: Video = channel.videos[row.video_id] || VideoRepository.Instance.convertQueryRowToVideoModel(row)

      if (row.face_id) {
        const face = video.statistics[0].video_thumbnail.faces.find(f => f.face_id === row.face_id) || new Face(row.face_id).setAll(row)
        video.statistics[0].video_thumbnail.faces = video.statistics[0].video_thumbnail.faces.filter(f => f.face_id !== row.face_id)
        video.statistics[0].video_thumbnail.faces.push(face)
      }

      if (row.clickbait_object_id) {
        const clickbaitObject = video.statistics[0].video_thumbnail.clickbait_objects.find(c => c.clickbait_object_id === row.clickbait_object_id) || new ClickbaitObject(row.clickbait_object_id).setAll(row)
        video.statistics[0].video_thumbnail.clickbait_objects = video.statistics[0].video_thumbnail.clickbait_objects.filter(c => c.clickbait_object_id !== row.clickbait_object_id)
        video.statistics[0].video_thumbnail.clickbait_objects.push(clickbaitObject)
      }

      channel.videos[row.video_id] = video
      channels.push(channel)

      return channels
    }, [])
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
        'SELECT c.*, cm.*, cs.* FROM channel c LEFT JOIN channel_statistic cs ON c.channel_id = cs.channel_id LEFT JOIN channel_meta cm on cs.channel_meta_id = cm.channel_meta_id WHERE tracked = true AND (DATE(timestamp) = (SELECT DATE(timestamp) FROM channel_statistic WHERE channel_id = c.channel_id ORDER BY timestamp DESC LIMIT 1))',

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

  public getAllWithVideosInRange = async (from: Date, to: Date): Promise<Channel[]> => {
    return new Promise<Channel[]>((resolve, reject) => {
      connection.query(
        'SELECT c.*, cm.*, cs.*, v.*, vm.*, vt.*, vs.*, f.*, co.* FROM channel c LEFT JOIN channel_statistic cs ON c.channel_id = cs.channel_id LEFT JOIN channel_meta cm on cs.channel_meta_id = cm.channel_meta_id LEFT JOIN video v on c.channel_id = v.channel_id LEFT JOIN video_statistic vs on v.video_id = vs.video_id LEFT JOIN video_meta vm on vs.video_meta_id = vm.video_meta_id LEFT JOIN video_thumbnail vt on vs.video_thumbnail_id = vt.video_thumbnail_id LEFT JOIN face f on vt.video_thumbnail_id = f.video_thumbnail_id LEFT JOIN clickbait_object co on vt.video_thumbnail_id = co.video_thumbnail_id WHERE tracked = true AND (DATE(cs.timestamp) = (SELECT DATE(timestamp) FROM channel_statistic WHERE channel_id = c.channel_id ORDER BY timestamp DESC LIMIT 1)) AND (DATE(vs.timestamp) = (SELECT DATE(timestamp) FROM video_statistic WHERE video_id = v.video_id ORDER BY timestamp DESC LIMIT 1)) AND (upload_time BETWEEN ? AND ?) AND success_factor IS NOT NULL',
        [from, to],

        (err, rows) => {
          if (err) reject(err)
          if (!rows) {
            console.log('Something went wrong. Try again.')
            reInitConnection()
            reject(new Error(ApiStatusCodes.TRY_AGAIN))
          } else {
            resolve(this.convertMultipleRows(rows))
          }
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
