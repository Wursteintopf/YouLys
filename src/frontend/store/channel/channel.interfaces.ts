import { ChannelInterface } from '../../../shared/Domain/Model/ChannelInterface'

export interface channelState {
  channels: ChannelInterface[]
  currentChannel: ChannelInterface
}
