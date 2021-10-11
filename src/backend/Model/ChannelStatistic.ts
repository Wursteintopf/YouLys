import { Video } from './Video'

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

  constructor (
    channelId: string,
    username?: string,
    profilePicture?: string,
    description?: string,
    subscriberCount?: number,
    subscriberCountHidden?: boolean,
    viewCount?: number,
    videoCount?: number,
    madeForKids?: boolean,
    trailerVideo?: Video,
    keywords?: string,
    timestamp?: Date,
    channelStatisticId?: number,
  ) {
    this.channel_statistic_id = channelStatisticId
    this.channel_id = channelId
    this.username = username
    this.profile_picture = profilePicture
    this.description = description
    this.subscriber_count = subscriberCount
    this.subscriber_count_hidden = subscriberCountHidden
    this.view_count = viewCount
    this.video_count = videoCount
    this.made_for_kids = madeForKids
    this.trailer_video = trailerVideo
    this.keywords = keywords
    this.timestamp = timestamp
  }
}
