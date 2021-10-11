import { VideoInterface } from './VideoInterface'

export interface ChannelStatisticInterface {
  channel_statistic_id?: number
  channel_id: string
  username?: string
  profile_picture?: string
  description?: string
  subscriber_count?: number
  subscriber_count_hidden?: boolean
  view_count?: number
  video_count?: number
  made_for_kids?: boolean
  trailer_video?: VideoInterface
  keywords?: string
  timestamp?: Date
}
