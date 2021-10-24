import { ChannelStatisticInterface } from '../../../shared/Domain/Model/ChannelStatisticInterface'
import { ChannelMeta } from './ChannelMeta'
import { EMPTY_CHANNEL_META } from '../../../shared/Domain/Model/ChannelMetaInterface'

export class ChannelStatistic implements ChannelStatisticInterface {
  channel_statistic_id: number
  channel_id: string
  channel_meta: ChannelMeta
  subscriber_count: number
  subscriber_count_hidden: boolean
  view_count: number
  video_count: number
  trailer_video_id: string
  timestamp: Date

  constructor (props: ChannelStatisticInterface) {
    this.channel_statistic_id = props.channel_statistic_id
    this.channel_id = props.channel_id
    this.subscriber_count = props.subscriber_count
    this.subscriber_count_hidden = props.subscriber_count_hidden
    this.view_count = props.view_count
    this.video_count = props.video_count
    this.trailer_video_id = props.trailer_video_id
    this.timestamp = props.timestamp

    if (props.channel_meta) this.channel_meta = new ChannelMeta(props.channel_meta)
    else this.channel_meta = new ChannelMeta(EMPTY_CHANNEL_META)
  }
}
