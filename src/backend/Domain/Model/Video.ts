import { VideoInterface } from '../../../shared/Domain/Model/VideoInterface'

export class Video implements VideoInterface {
  video_id: string
  channel_id?: string
  upload_time?: Date
  duration?: number

  constructor (props: VideoInterface) {
    this.video_id = props.video_id
    this.channel_id = props.channel_id
    this.upload_time = props.upload_time
    this.duration = props.duration
  }
}
