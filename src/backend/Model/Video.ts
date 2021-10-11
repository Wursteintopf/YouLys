export class Video {
  video_id: string
  channel_id?: string
  upload_time?: Date
  duration?: number

  constructor (
    videoId: string,
    channelId?: string,
    uploadTime?: Date,
    duration?: number,
  ) {
    this.video_id = videoId
    this.channel_id = channelId
    this.upload_time = uploadTime
    this.duration = duration
  }
}
