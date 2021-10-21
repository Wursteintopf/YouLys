import { callFiftyNewestVideosOfChannel, callVideoStatistics } from './YoutubeApiCaller/VideoCaller'
import { callChannelStatistics } from './YoutubeApiCaller/ChannelCaller'
import { ChannelRepository } from './Domain/Repository/ChannelRepository'
import { VideoRepository } from './Domain/Repository/VideoRepository'

const run = async () => {
  const channelRepository = new ChannelRepository()
  const videoRepository = new VideoRepository()

  const channels = await channelRepository.getAll()

  await Promise.all(channels.map(async channel => {
    await callChannelStatistics(channelRepository, channel.channel_id)

    await callFiftyNewestVideosOfChannel(videoRepository, channel.channel_id)
    const videos = await videoRepository.getFiftyNewestByChannel(channel.channel_id)

    await Promise.all(videos.map(async video => {
      await callVideoStatistics(videoRepository, video.video_id)
      return true
    }))
  }))
}

run()
  .then(() => {
    console.log('Successfully called Data')
    process.exit(1)
  })
  .catch(err => {
    console.log(err)
    process.exit(0)
  })
