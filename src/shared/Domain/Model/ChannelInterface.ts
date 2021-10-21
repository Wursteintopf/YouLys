import { ChannelStatisticInterface } from './ChannelStatisticInterface'
import { VideoInterface } from './VideoInterface'

export interface ChannelInterface {
  channel_id: string
  created_at?: Date
  statistics?: ChannelStatisticInterface[]
  videos?: VideoInterface[]
}
