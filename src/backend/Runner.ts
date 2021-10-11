import { callFiftyNewestVideosOfChannel, callVideoStatistics } from './Caller/VideoCaller'
import { getChannelList } from './Database/ChannelQueries'
import { getFiftyNewestVideosByChannel } from './Database/VideoQueries'
import { setUpProject } from './Helper/SetupHelper'
import { callChannelStatistics } from './Caller/ChannelCaller'

const run = async () => {
  const channels = await getChannelList()
  channels.forEach(channel => {
    callChannelStatistics(channel.channelId)

    callFiftyNewestVideosOfChannel(channel.channelId)
      .then(() => {
        getFiftyNewestVideosByChannel(channel.channelId)
          .then((videos) => {
            videos.forEach(video => {
              callVideoStatistics(video.videoId)
            })
          })
      })
  })
}

setUpProject()
  .then(() => run())
