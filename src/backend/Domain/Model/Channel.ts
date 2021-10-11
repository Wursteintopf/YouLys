import { ChannelStatistic } from './ChannelStatistic'
import { Video } from './Video'
import { ChannelInterface } from '../../../shared/Domain/Model/ChannelInterface'

export class Channel implements ChannelInterface {
  channel_id: string
  created_at?: Date
  statistics?: ChannelStatistic[]
  videos?: Video[]

  constructor (props: ChannelInterface) {
    this.channel_id = props.channel_id
    this.created_at = props.created_at
    this.statistics = props.statistics
    this.videos = props.videos
  }
}
