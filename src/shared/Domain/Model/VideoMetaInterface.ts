export interface VideoMetaInterface {
  video_meta_id: number
  title: string
  description: string
  tags: string
}

export const EMPTY_VIDEO_META: VideoMetaInterface = {
  description: '',
  tags: '',
  title: '',
  video_meta_id: 0,
}
