import { VideoStatisticInterface } from './VideoStatisticInterface'

export interface VideoInterface {
  video_id: string
  channel_id: string
  upload_time: Date
  duration: number
  statistics: VideoStatisticInterface[]
}

export const EMPTY_VIDEO: VideoInterface = {
  channel_id: '',
  duration: 0,
  statistics: [],
  upload_time: new Date(),
  video_id: '',
}
