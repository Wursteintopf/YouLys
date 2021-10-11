import { VideoStatisticInterface } from '../../../shared/Domain/Model/VideoStatisticInterface'

export class VideoStatistic implements VideoStatisticInterface {
  video_statistic_id?: number
  video_id: string
  views?: number
  title?: string
  thumbnail?: string
  description?: string
  tags?: string
  likes?: number
  dislikes?: number
  favouriteCount?: number
  commentCount?: number

  constructor (props: VideoStatisticInterface) {
    this.video_statistic_id = props.video_statistic_id
    this.video_id = props.video_id
    this.views = props.views
    this.title = props.title
    this.thumbnail = props.thumbnail
    this.description = props.description
    this.tags = props.tags
    this.likes = props.likes
    this.dislikes = props.dislikes
    this.favouriteCount = props.favouriteCount
    this.commentCount = props.commentCount
  }
}
