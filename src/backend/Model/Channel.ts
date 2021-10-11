import { ChannelStatistic } from './ChannelStatistic'
import { Video } from './Video'

export class Channel {
  channel_id: string
  tracked?: boolean
  created_at?: Date
  statistics?: ChannelStatistic[]
  videos?: Video[]

  constructor (
    channelId: string,
    tracked?: boolean,
    createdAt?: Date,
    statistics?: ChannelStatistic[],
    videos?: Video[],
  ) {
    this.channel_id = channelId
    this.tracked = tracked
    this.created_at = createdAt
    this.statistics = statistics
    this.videos = videos
  }
}
