import { VideoMetaInterface } from '../../../shared/Domain/Model/VideoMetaInterface'

export class VideoMeta implements VideoMetaInterface {
  video_meta_id: number
  title: string
  description: string
  tags: string

  constructor (props: VideoMetaInterface) {
    this.video_meta_id = props.video_meta_id
    this.title = props.title
    this.description = props.description
    this.tags = props.tags
  }

  public equals = (other: VideoMetaInterface): boolean => {
    if (
      this.title === other.title &&
      this.description === other.description &&
      this.tags === other.tags
    ) return true
    else return false
  }
}
