import { VideoInterface } from '../../../shared/Domain/Model/VideoInterface'
import { VideoStatistic } from './VideoStatistic'

export class Video implements VideoInterface {
  video_id: string
  channel_id?: string
  upload_time?: Date
  duration?: number
  statistics?: VideoStatistic[]

  constructor (props: VideoInterface) {
    this.video_id = props.video_id
    this.channel_id = props.channel_id
    this.upload_time = props.upload_time
    this.duration = props.duration
    this.statistics = props.statistics
  }
}
