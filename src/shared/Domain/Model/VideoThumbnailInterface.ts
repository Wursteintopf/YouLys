export interface VideoThumbnailInterface {
  video_thumbnail_id: number
  thumbnail: string
}

export const EMPTY_VIDEO_THUMBNAIL: VideoThumbnailInterface = {
  thumbnail: '',
  video_thumbnail_id: 0,
}
