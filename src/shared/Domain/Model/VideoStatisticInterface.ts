import { EMPTY_VIDEO_META, VideoMetaInterface } from './VideoMetaInterface'
import { EMPTY_VIDEO_THUMBNAIL, VideoThumbnailInterface } from './VideoThumbnailInterface'

export interface VideoStatisticInterface {
  video_statistic_id: number
  video_id: string
  video_meta: VideoMetaInterface
  video_thumbnail: VideoThumbnailInterface
  views: number
  likes: number
  favouriteCount: number
  commentCount: number
  timestamp: Date
  success_factor: number
}

export const EMPTY_VIDEO_STATISTIC: VideoStatisticInterface = {
  commentCount: 0,
  favouriteCount: 0,
  likes: 0,
  timestamp: new Date(),
  video_id: '',
  video_meta: EMPTY_VIDEO_META,
  video_statistic_id: 0,
  video_thumbnail: EMPTY_VIDEO_THUMBNAIL,
  views: 0,
  success_factor: 4,
}
