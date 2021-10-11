export class Video {
  videoId: string
  channelId?: string
  uploadTime?: Date
  duration?: number

  constructor (
    videoId: string,
    channelId?: string,
    uploadTime?: Date,
    duration?: number,
  ) {
    this.videoId = videoId
    this.channelId = channelId
    this.uploadTime = uploadTime
    this.duration = duration
  }
}
