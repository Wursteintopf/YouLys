import {ChannelStatistic} from './ChannelStatistic'
import {Video} from './Video'

export class Channel {
  channel_id: string
  tracked?: boolean
  created_at?: Date
  statistics?: ChannelStatistic[]
  videos?: Video[]

  constructor(
    channel_id: string,
    tracked?: boolean,
    created_at?: Date,
    statistics?: ChannelStatistic[],
    videos?: Video[]
  ) {
    this.channel_id = channel_id
    this.tracked = tracked
    this.created_at = created_at
    this.statistics = statistics
    this.videos = videos
  }
}