import { Video } from './Video'

export class ChannelStatistic {
  channelStatisticId?: number
  channelId: string
  username?: string
  profilePicture?: string
  description?: string
  subscriberCount?: number
  subscriberCountHidden?: boolean
  viewCount?: number
  videoCount?: number
  madeForKids?: boolean
  trailerVideo?: Video
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
    this.channelStatisticId = channelStatisticId
    this.channelId = channelId
    this.username = username
    this.profilePicture = profilePicture
    this.description = description
    this.subscriberCount = subscriberCount
    this.subscriberCountHidden = subscriberCountHidden
    this.viewCount = viewCount
    this.videoCount = videoCount
    this.madeForKids = madeForKids
    this.trailerVideo = trailerVideo
    this.keywords = keywords
    this.timestamp = timestamp
  }
}
