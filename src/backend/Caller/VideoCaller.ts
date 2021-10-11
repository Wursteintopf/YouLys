import { Channel } from '../Model/Channel'
import config from '../Config'
import fetch from 'node-fetch'
import { createVideo, createVideoStatistic, getVideoListByChannel } from '../Database/VideoQueries'
import { Video } from '../Model/Video'
import { VideoStatistic } from '../Model/VideoStatistic'

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3/'
const MAX_RESULTS = 50

export const callFiftyNewestVideosOfChannel = async (channel: Channel | string) => {
  const channelId = channel instanceof Channel ? channel.channelId : channel

  const part = 'part=snippet'
  const playlistId = `playlistId=${channelId.replace('UC', 'UU')}`
  const maxResults = `maxResults=${MAX_RESULTS}`
  const apiKey = `key=${config.apiKey}`
  const searchUrl = `${API_BASE_URL}playlistItems?${part}&${playlistId}&${maxResults}&${apiKey}`

  const result = await fetch(searchUrl)
  const json = await result.json()

  const newVideos = json.items ? json.items.map(item => item.snippet) : []

  const videos = await getVideoListByChannel(channelId)
  const videoIds = videos.map(video => video.videoId)

  const notAddedVideos = newVideos.filter(video => !videoIds.includes(video.resourceId.videoId))

  if (notAddedVideos && notAddedVideos.length > 0) {
    notAddedVideos.forEach(video => {
      createVideo(new Video(video.resourceId.videoId, video.channelId, video.publishedAt, 0))
    })
  }
}

// TODO: Update duration of video, if necessary
export const callVideoStatistics = async (video: Video | string) => {
  const videoId = video instanceof Video ? video.videoId : video

  const part = 'part=snippet,statistics,status'
  const id = `id=${videoId}`
  const apiKey = `key=${config.apiKey}`

  const searchUrl = `${API_BASE_URL}videos?${part}&${id}&${apiKey}`

  const result = await fetch(searchUrl)
  const json = await result.json()

  const videoData = json.items[0]

  await createVideoStatistic(new VideoStatistic(
    videoData.id,
    videoData.statistics.viewCount,
    videoData.snippet.title,
    videoData.snippet.thumbnails.maxres ? videoData.snippet.thumbnails.maxres.url : videoData.snippet.thumbnails.high.url,
    videoData.snippet.description,
    videoData.snippet.tags ? videoData.snippet.tags.join() : '',
    videoData.statistics.likeCount,
    videoData.statistics.dislikeCount,
    videoData.statistics.favoriteCount,
    videoData.statistics.commentCount,
  ))
}
