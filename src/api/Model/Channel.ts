import {ChannelStatistic} from './ChannelStatistic'

export class Channel {
  channel_id: string
  username?: string
  profilePicture?: string
  tracked?: boolean
  statistics?: ChannelStatistic[]

  constructor(
    channel_id: string,
    username?: string,
    profilePicture?: string,
    tracked?: boolean,
    statistics?: ChannelStatistic[]
  ) {
    this.channel_id = channel_id
    this.username = username
    this.profilePicture = profilePicture
    this.tracked = tracked
    this.statistics = statistics
  }
}