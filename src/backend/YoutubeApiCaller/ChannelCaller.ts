import { Channel } from '../Domain/Model/Channel'
import config from '../Config'
import { ChannelStatistic } from '../Domain/Model/ChannelStatistic'
import fetch from 'node-fetch'
import { ChannelRepository } from '../Domain/Repository/ChannelRepository'

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3/'

export const callChannelStatistics = async (channelRepository: ChannelRepository, channel: Channel | string) => {
  const channelId = channel instanceof Channel ? channel.channel_id : channel

  const part = 'part=snippet,statistics,status,brandingSettings'
  const id = `id=${channelId}`
  const apiKey = `key=${config.apiKey}`

  const searchUrl = `${API_BASE_URL}channels?${part}&${id}&${apiKey}`

  const result = await fetch(searchUrl)
  const json = await result.json()

  const channelData = json.items[0]

  const statistic = new ChannelStatistic({
    channel_id: channelData.id,
    username: channelData.snippet.title,
    profile_picture: channelData.snippet.thumbnails.high.url,
    description: channelData.snippet.description,
    subscriber_count: channelData.statistics.subscriberCount,
    subscriber_count_hidden: channelData.statistics.hiddenSubscriberCount,
    view_count: channelData.statistics.viewCount,
    video_count: channelData.statistics.videoCount,
    made_for_kids: channelData.status.madeForKids,
    trailer_video: channelData.brandingSettings.channel.unsubscribedTrailer,
    keywords: channelData.brandingSettings.channel.keywords,
  })

  // TODO: Created at in der Channels Tabelle updaten

  await channelRepository.saveStatistic(statistic)
}
