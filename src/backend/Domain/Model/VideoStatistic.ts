import { VideoStatisticInterface } from '../../../shared/Domain/Model/VideoStatisticInterface'
import { VideoMeta } from './VideoMeta'
import { VideoThumbnail } from './VideoThumbnail'
import { EMPTY_VIDEO_META } from '../../../shared/Domain/Model/VideoMetaInterface'
import { EMPTY_VIDEO_THUMBNAIL } from '../../../shared/Domain/Model/VideoThumbnailInterface'

export class VideoStatistic implements VideoStatisticInterface {
  video_statistic_id: number
  video_id: string
  video_meta: VideoMeta
  video_thumbnail: VideoThumbnail
  views: number
  likes: number
  dislikes: number
  favouriteCount: number
  commentCount: number
  timestamp: Date
  success_factor: number

  constructor (props: VideoStatisticInterface) {
    this.video_statistic_id = props.video_statistic_id
    this.video_id = props.video_id
    this.views = props.views
    this.likes = props.likes
    this.dislikes = props.dislikes
    this.favouriteCount = props.favouriteCount
    this.commentCount = props.commentCount
    this.timestamp = props.timestamp
    this.success_factor = props.success_factor

    if (props.video_meta) this.video_meta = new VideoMeta(props.video_meta)
    else this.video_meta = new VideoMeta(EMPTY_VIDEO_META)

    if (props.video_thumbnail) this.video_thumbnail = new VideoThumbnail(props.video_thumbnail)
    else this.video_thumbnail = new VideoThumbnail(EMPTY_VIDEO_THUMBNAIL)
  }
}
