import {Video} from './Video'

export class ChannelStatistic {
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

  constructor(
    channel_id: string,
    username?: string,
    profile_picture?: string,
    description?: string,
    subscriber_count?: number,
    subscriber_count_hidden?: boolean,
    view_count?: number,
    video_count?: number,
    made_for_kids?: boolean,
    trailer_video?: Video,
    keywords?: string,
    timestamp?: Date,
    channel_statistic_id?: number,
  ) {
      this.channel_statistic_id = channel_statistic_id
      this.channel_id = channel_id
      this.username = username
      this.profile_picture = profile_picture
      this.description = description
      this.subscriber_count = subscriber_count
      this.subscriber_count_hidden = subscriber_count_hidden
      this.view_count = view_count
      this.video_count = video_count
      this.made_for_kids = made_for_kids
      this.trailer_video = trailer_video
      this.keywords = keywords
      this.timestamp = timestamp
  }
}
