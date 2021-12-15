import { ChannelInterface } from '../../../shared/Domain/Model/ChannelInterface'

export interface channelState {
  channels: { [id: string]: ChannelInterface }
  currentChannel: string
  currentVideo: string
}
