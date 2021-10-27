import { FaceInterface } from './FaceInterface'

export interface VideoThumbnailInterface {
  video_thumbnail_id: number
  thumbnail: string
  faces: FaceInterface[]
}

export const EMPTY_VIDEO_THUMBNAIL: VideoThumbnailInterface = {
  thumbnail: '',
  video_thumbnail_id: 0,
  faces: []
}
