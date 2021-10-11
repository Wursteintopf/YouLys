import { callFiftyNewestVideosOfChannel, callVideoStatistics } from './YoutubeApiCaller/VideoCaller'
import { callChannelStatistics } from './YoutubeApiCaller/ChannelCaller'
import { ChannelRepository } from './Domain/Repository/ChannelRepository'
import { VideoRepository } from './Domain/Repository/VideoRepository'

const run = async () => {
  const channelRepository = new ChannelRepository()
  const videoRepository = new VideoRepository()

  const channels = await channelRepository.getAll()

  channels.forEach(channel => {
    callChannelStatistics(channelRepository, channel.channel_id)

    callFiftyNewestVideosOfChannel(videoRepository, channel.channel_id)
      .then(() => {
        videoRepository.getFiftyNewestByChannel(channel.channel_id)
          .then((videos) => {
            videos.forEach(video => {
              callVideoStatistics(video.video_id)
            })
          })
      })
  })
}

run()
