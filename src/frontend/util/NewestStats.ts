import { ChannelStatisticInterface } from '../../shared/Domain/Model/ChannelStatisticInterface'
import { ChannelInterface } from '../../shared/Domain/Model/ChannelInterface'
import { VideoStatisticInterface } from '../../shared/Domain/Model/VideoStatisticInterface'
import { VideoInterface } from '../../shared/Domain/Model/VideoInterface'

export const newestChannelStat = (channel: ChannelInterface): ChannelStatisticInterface => {
  return channel.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0]
}

export const newestVideoStat = (video: VideoInterface): VideoStatisticInterface => {
  return video.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0]
}
