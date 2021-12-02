import { ChannelStatisticInterface } from '../../../shared/Domain/Model/ChannelStatisticInterface'
import { ChannelMeta } from './ChannelMeta'
import { connection } from '../../Helper/DatabaseHelper'
import moment from 'moment'

export class ChannelStatistic implements ChannelStatisticInterface {
  channel_statistic_id: number
  channel_id = ''
  channel_meta: ChannelMeta = new ChannelMeta(0)
  subscriber_count = 0
  subscriber_count_hidden = false
  view_count = 0
  video_count = 0
  trailer_video_id = ''
  timestamp: Date = new Date()
  success_factor = 0

  constructor (channel_statistic_id: number) {
    this.channel_statistic_id = channel_statistic_id
  }

  /**
   * Basics
   */

  public static setUpChannelStatisticsTable = () => {
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

  public setAll = (props: ChannelStatisticInterface): ChannelStatistic => {
    this.channel_id = props.channel_id
    this.subscriber_count = props.subscriber_count
    this.subscriber_count_hidden = props.subscriber_count_hidden
    this.view_count = props.view_count
    this.video_count = props.video_count
    this.trailer_video_id = props.trailer_video_id
    this.timestamp = props.timestamp
    this.success_factor = props.success_factor

    if (props.channel_meta) {
      this.channel_meta = new ChannelMeta(props.channel_meta.channel_meta_id)
      this.channel_meta.setAll(props.channel_meta)
    }

    return this
  }

  public create = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO channel_statistic(channel_id, channel_meta_id, subscriber_count, subscriber_count_hidden, view_count, video_count, trailer_video_id, success_factor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [this.channel_id, this.channel_meta.channel_meta_id, this.subscriber_count, this.subscriber_count_hidden, this.view_count, this.video_count, this.trailer_video_id, this.success_factor],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }

  public update = async (channelStatistic: ChannelStatistic): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'INSERT INTO channel_statistic(channel_id, channel_meta_id, subscriber_count, subscriber_count_hidden, view_count, video_count, trailer_video_id, timestamp, success_factor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [channelStatistic.channel_id, channelStatistic.channel_meta.channel_meta_id, channelStatistic.subscriber_count, channelStatistic.subscriber_count_hidden, channelStatistic.view_count, channelStatistic.video_count, channelStatistic.trailer_video_id, moment(channelStatistic.timestamp).format('YYYY-MM-DD HH:mm:ss'), this.success_factor],

        err => {
          if (err) reject(err)
          resolve(true)
        },
      )
    })
  }
}
