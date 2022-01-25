import { ChannelStatisticInterface } from './ChannelStatisticInterface'
import { VideoInterface } from './VideoInterface'

export interface ChannelInterface {
  channel_id: string
  created_at: Date
  statistics: ChannelStatisticInterface[]
  videos: { [key: string]: VideoInterface }
  tracked: boolean
}

export const EMPTY_CHANNEL: ChannelInterface = {
  channel_id: '',
  created_at: new Date(),
  statistics: [],
  videos: {},
  tracked: true,
}
