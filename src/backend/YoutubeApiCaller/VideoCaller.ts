import { Channel } from '../Domain/Model/Channel'
import config from '../Config'
import fetch from 'node-fetch'
import { Video } from '../Domain/Model/Video'
import { VideoStatistic } from '../Domain/Model/VideoStatistic'
import { VideoRepository } from '../Domain/Repository/VideoRepository'

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3/'
const MAX_RESULTS = 50

export const callFiftyNewestVideosOfChannel = async (videoRepository: VideoRepository, channel: Channel | string) => {
  const channelId = channel instanceof Channel ? channel.channel_id : channel

  const part = 'part=snippet'
  const playlistId = `playlistId=${channelId.replace('UC', 'UU')}`
  const maxResults = `maxResults=${MAX_RESULTS}`
  const apiKey = `key=${config.apiKey}`
  const searchUrl = `${API_BASE_URL}playlistItems?${part}&${playlistId}&${maxResults}&${apiKey}`

  const result = await fetch(searchUrl)
  const json = await result.json()

  const newVideos = json.items ? json.items.map(item => item.snippet) : []

  const videos = await videoRepository.getFiftyNewestByChannel(channelId)
  const videoIds = videos.map(video => video.video_id)

  const notAddedVideos = newVideos.filter(video => !videoIds.includes(video.resourceId.videoId))

  if (notAddedVideos && notAddedVideos.length > 0) {
    notAddedVideos.forEach(video => {
      const newVideo = new Video({
        video_id: video.resourceId.videoId,
        channel_id: video.channelId,
        upload_time: video.publishedAt,
        duration: 0,
      })
      videoRepository.save(newVideo)
    })
  }
}

// TODO: Update duration of video, if necessary
export const callVideoStatistics = async (videoRepository: VideoRepository, video: Video | string) => {
  const videoId = video instanceof Video ? video.video_id : video

  const part = 'part=snippet,statistics,status'
  const id = `id=${videoId}`
  const apiKey = `key=${config.apiKey}`

  const searchUrl = `${API_BASE_URL}videos?${part}&${id}&${apiKey}`

  const result = await fetch(searchUrl)
  const json = await result.json()

  const videoData = json.items[0]

  const statistic = new VideoStatistic({
    video_id: videoData.id,
    views: videoData.statistics.viewCount,
    title: videoData.snippet.title,
    thumbnail: videoData.snippet.thumbnails.maxres ? videoData.snippet.thumbnails.maxres.url : videoData.snippet.thumbnails.high.url,
    description: videoData.snippet.description,
    tags: videoData.snippet.tags ? videoData.snippet.tags.join() : '',
    likes: videoData.statistics.likeCount,
    dislikes: videoData.statistics.dislikeCount,
    favouriteCount: videoData.statistics.favoriteCount,
    commentCount: videoData.statistics.commentCount,
  })

  await videoRepository.saveStatistic(statistic)
}
