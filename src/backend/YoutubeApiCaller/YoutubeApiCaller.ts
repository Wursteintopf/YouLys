import config from '../Config'
import fetch from 'node-fetch'
import { ChannelApiResult } from '../Domain/Model/ChannelApiResult'
import { VideoApiPlaylistResult, VideoApiResult } from '../Domain/Model/VideoApiResult'

const MAX_RESULTS = 20

export const callChannelStatistics = async (channelId: string): Promise<ChannelApiResult> => {
  const part = 'part=snippet,statistics,brandingSettings'
  const id = `id=${channelId}`
  const apiKey = `key=${config.api.key}`

  const searchUrl = `${config.api.baseUrl}channels?${part}&${id}&${apiKey}`

  const result = await fetch(searchUrl)
  const json = await result.json()

  if (json.error) {
    throw new Error(json.error.message)
  } else if (json.items[0]) {
    return json.items[0]
  } else {
    throw new Error("Unexpected Error. This shouldn't happen.")
  }
}

export const callFiftyNewestVideosOfChannel = async (channelId: string): Promise<VideoApiPlaylistResult[]> => {
  const part = 'part=snippet'
  const playlistId = `playlistId=${channelId.replace('UC', 'UU')}`
  const maxResults = `maxResults=${MAX_RESULTS}`
  const apiKey = `key=${config.api.key}`
  const searchUrl = `${config.api.baseUrl}playlistItems?${part}&${playlistId}&${maxResults}&${apiKey}`

  const result = await fetch(searchUrl)
  const json = await result.json()

  if (json.error) {
    throw new Error(json.error.message)
  } else if (json.items) {
    return json.items
  } else {
    throw new Error("Unexpected Error. This shouldn't happen.")
  }
}

export const callVideoStatistics = async (videoId: string): Promise<VideoApiResult> => {
  const part = 'part=snippet,statistics,contentDetails'
  const id = `id=${videoId}`
  const apiKey = `key=${config.api.key}`

  const searchUrl = `${config.api.baseUrl}videos?${part}&${id}&${apiKey}`

  const result = await fetch(searchUrl)
  const json = await result.json()

  if (json.error) {
    throw new Error(json.error.message)
  } else if (json.items[0]) {
    return json.items[0]
  } else {
    throw new Error("Unexpected Error. This shouldn't happen.")
  }
}
