import { Video } from './Video'
import { ChannelStatisticInterface } from '../../../shared/Domain/Model/ChannelStatisticInterface'

export class ChannelStatistic implements ChannelStatisticInterface{
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
  trailer_video?: Video
  keywords?: string
  timestamp?: Date

  constructor (props: ChannelStatisticInterface) {
    this.channel_statistic_id = props.channel_statistic_id
    this.channel_id = props.channel_id
    this.username = props.username
    this.profile_picture = props.profile_picture
    this.description = props.description
    this.subscriber_count = props.subscriber_count
    this.subscriber_count_hidden = props.subscriber_count_hidden
    this.view_count = props.view_count
    this.video_count = props.video_count
    this.made_for_kids = props.made_for_kids
    this.trailer_video = props.trailer_video
    this.keywords = props.keywords
    this.timestamp = props.timestamp
  }
}
