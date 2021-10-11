import { ChannelStatistic } from './ChannelStatistic'
import { Video } from './Video'

export class Channel {
  channelId: string
  tracked?: boolean
  createdAt?: Date
  statistics?: ChannelStatistic[]
  videos?: Video[]

  constructor (
    channelId: string,
    tracked?: boolean,
    createdAt?: Date,
    statistics?: ChannelStatistic[],
    videos?: Video[],
  ) {
    this.channelId = channelId
    this.tracked = tracked
    this.createdAt = createdAt
    this.statistics = statistics
    this.videos = videos
  }
}
