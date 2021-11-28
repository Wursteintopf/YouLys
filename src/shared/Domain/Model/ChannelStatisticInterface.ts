import { ChannelMetaInterface, EMPTY_CHANNEL_META } from './ChannelMetaInterface'

export interface ChannelStatisticInterface {
  channel_statistic_id: number
  channel_id: string
  channel_meta: ChannelMetaInterface
  subscriber_count: number
  subscriber_count_hidden: boolean
  view_count: number
  video_count: number
  trailer_video_id: string
  timestamp: Date
  success_factor: number
}

export const EMPTY_CHANNEL_STATISTIC: ChannelStatisticInterface = {
  channel_id: '',
  channel_meta: EMPTY_CHANNEL_META,
  channel_statistic_id: 0,
  subscriber_count: 0,
  subscriber_count_hidden: false,
  timestamp: new Date(),
  trailer_video_id: '',
  video_count: 0,
  view_count: 0,
  success_factor: 4,
}
