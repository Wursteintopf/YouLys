export interface ChannelMetaInterface {
  channel_meta_id: number
  username: string
  profile_picture: string
  description: string
  keywords: string
}

export const EMPTY_CHANNEL_META: ChannelMetaInterface = {
  channel_meta_id: 0,
  description: '',
  keywords: '',
  profile_picture: '',
  username: '',
}
