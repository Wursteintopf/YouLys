import { ChannelMetaInterface } from '../../../shared/Domain/Model/ChannelMetaInterface'

export class ChannelMeta implements ChannelMetaInterface {
  channel_meta_id: number
  username: string
  profile_picture: string
  description: string
  keywords: string

  constructor (props: ChannelMetaInterface) {
    this.channel_meta_id = props.channel_meta_id
    this.description = props.description
    this.keywords = props.keywords
    this.profile_picture = props.profile_picture
    this.username = props.username
  }

  public equals = (other: ChannelMetaInterface): boolean => {
    if (
      this.username === other.username &&
      this.profile_picture === other.profile_picture &&
      this.description === other.description &&
      this.keywords === other.keywords
    ) return true
    else return false
  }
}
