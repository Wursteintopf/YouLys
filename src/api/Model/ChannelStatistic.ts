export class ChannelStatistic {
  channel_statistic_id: number
  channel_id: string
  subscriber_count?: number
  view_count?: number
  timestamp?: Date

  constructor(
    channel_statistic_id: number,
    channel_id: string,
    subscriber_count?: number,
    view_count?: number,
    timestamp?: Date
  ) {
    this.channel_statistic_id = channel_statistic_id
    this.channel_id = channel_id
    this.subscriber_count = subscriber_count
    this.view_count = view_count
    this.timestamp = timestamp
  }
}