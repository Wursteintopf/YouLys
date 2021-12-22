import { FaceInterface } from './FaceInterface'
import { ClickbaitObjectInterface } from './ClickbaitObjectInterface'

export interface VideoThumbnailInterface {
  video_thumbnail_id: number
  thumbnail: string
  faces: FaceInterface[]
  clickbait_objects: ClickbaitObjectInterface[]
}

export const EMPTY_VIDEO_THUMBNAIL: VideoThumbnailInterface = {
  thumbnail: '',
  video_thumbnail_id: 0,
  faces: [],
  clickbait_objects: [],
}
