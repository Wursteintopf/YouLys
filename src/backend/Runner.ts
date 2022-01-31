import { ChannelRepository } from './Domain/Repository/ChannelRepository'

const run = async (): Promise<boolean> => {
  // Load all Channel from Database
  const channels = await ChannelRepository.Instance.getAllWithoutStats()

  console.log('SUCCESS: Loaded channels from database')

  // Load Stats for all Channels
  for await (const channel of channels) {
    channel.callStatistics()
      .catch(err => console.error(err))
  }

  console.log('SUCCESS: Fetched statistics for all channels')

  // Load Video Stats for all Channels
  for await (const channel of channels) {
    await channel.callFiftyNewestVideos()
      .then(async () => {
        console.log('SUCCESS: Fetched 50 newest videos for channel with the id ' + channel.channel_id)

        const sortedVideos = Object.keys(channel.videos).map(key => channel.videos[key]).sort((a, b) => a.upload_time.getTime() - b.upload_time.getTime())

        for await (const video of sortedVideos) {
          await video.callStatistics()
            .then(promise => {
              console.log('SUCCESS: Fetched statistics for the video with the id ' + video.video_id)
              return promise
            })
            .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err))
  }

  return true
}

run()
  .then(() => {
    console.log('SUCCESS: Successfully called all data')
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
