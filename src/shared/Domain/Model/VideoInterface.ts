import { VideoStatistic } from '../../../backend/Domain/Model/VideoStatistic'

export interface VideoInterface {
  video_id: string
  channel_id?: string
  upload_time?: Date
  duration?: number
  statistics?: VideoStatistic[]
}
