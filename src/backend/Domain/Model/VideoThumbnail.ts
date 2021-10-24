import { VideoThumbnailInterface } from '../../../shared/Domain/Model/VideoThumbnailInterface'

export class VideoThumbnail implements VideoThumbnailInterface {
  video_thumbnail_id: number
  thumbnail: string

  constructor (props: VideoThumbnailInterface) {
    this.video_thumbnail_id = props.video_thumbnail_id
    this.thumbnail = props.thumbnail
  }

  public equals = (other: VideoThumbnailInterface): boolean => {
    if (this.thumbnail === other.thumbnail) return true
    else return false
  }
}
