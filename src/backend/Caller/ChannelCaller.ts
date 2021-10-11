import { Channel } from '../Model/Channel'
import config from '../Config'
import { createChannelStatistic } from '../Database/ChannelQueries'
import { ChannelStatistic } from '../Model/ChannelStatistic'
import fetch from 'node-fetch'

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3/'

export const callChannelStatistics = async (channel: Channel | string) => {
  const channelId = channel instanceof Channel ? channel.channel_id : channel

  const part = 'part=snippet,statistics,status,brandingSettings'
  const id = `id=${channelId}`
  const apiKey = `key=${config.apiKey}`

  const searchUrl = `${API_BASE_URL}channels?${part}&${id}&${apiKey}`

  const result = await fetch(searchUrl)
  const json = await result.json()

  const channelData = json.items[0]

  await createChannelStatistic(new ChannelStatistic(
    channelData.id,
    channelData.snippet.title,
    channelData.snippet.thumbnails.high.url,
    channelData.snippet.description,
    channelData.statistics.subscriberCount,
    channelData.statistics.hiddenSubscriberCount,
    channelData.statistics.viewCount,
    channelData.statistics.videoCount,
    channelData.status.madeForKids,
    channelData.brandingSettings.channel.unsubscribedTrailer,
    channelData.brandingSettings.channel.keywords,
  ))
}
