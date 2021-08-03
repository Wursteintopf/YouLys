import {callFiftyNewestVideosOfChannel, callVideoStatistics} from "./Caller/VideoCaller";
import {getChannelList} from "./Database/ChannelQueries";
import {getFiftyNewestVideosByChannel} from "./Database/VideoQueries";
import {setUpProject} from "./Helper/SetupHelper";
import {callChannelStatistics} from "./Caller/ChannelCaller";

const run = async () => {
  const channels = await getChannelList()
  channels.forEach(channel => {
    callChannelStatistics(channel.channel_id)

    callFiftyNewestVideosOfChannel(channel.channel_id)
      .then(() => {
        getFiftyNewestVideosByChannel(channel.channel_id)
          .then((videos) => {
            videos.forEach(video => {
              callVideoStatistics(video.video_id)
            })
          })
      })
  })
}

setUpProject()
  .then(() => run())
