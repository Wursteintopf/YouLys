export class Video {
  video_id: string
  channel_id?: string
  upload_time?: Date
  duration?: number

  constructor(
    video_id: string,
    channel_id?: string,
    upload_time?: Date,
    duration?: number
  ) {
    this.video_id = video_id
    this.channel_id = channel_id
    this.upload_time = upload_time
    this.duration = duration
  }
}