import { ChannelInterface } from '../../../shared/Domain/Model/ChannelInterface'

export interface WordWeight {
  value: string
  count: number
}

export interface channelState {
  channels: { [id: string]: ChannelInterface }
  currentChannel: string
  currentVideo: string
  wordWeights: WordWeight[]
}
