export class Channel {
  channel_id: string
  username?: string
  profilePicture?: string
  tracked?: boolean

  constructor(
    channel_id: string,
    username?: string,
    profilePicture?: string,
    tracked?: boolean
  ) {
    this.channel_id = channel_id
    this.username = username
    this.profilePicture = profilePicture
    this.tracked = tracked
  }
}