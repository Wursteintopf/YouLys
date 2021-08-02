import {callFiftyNewestVideosOfChannel, callVideoStatistics} from "./Caller/VideoCaller";
import {getChannelList} from "./Database/ChannelQueries";
import {getFiftyNewestVideosByChannel} from "./Database/VideoQueries";
import {setUpProject} from "./Helper/SetupHelper";
import {callChannelStatistics} from "./Caller/ChannelCaller";

/**
 * TODO für den Runner:
 *  1. Über alle Kanäle loopen
 *  2. Für jeden checken ob es neue Videos gibt
 *  3. Für jeden Kanalstatistiken laden
 *  4. Für jeden Videostatistiken für 50 neuste Videos laden (await check ob neue Videos)
 */

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
