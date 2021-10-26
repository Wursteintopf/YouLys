import { ChannelRepository } from './Domain/Repository/ChannelRepository'

const run = async (): Promise<boolean> => {
  // Load all Channel from Database
  const channels = await ChannelRepository.Instance.getAll()

  console.log('SUCCESS: Loaded channels from database')

  // Load Stats for all Channels
  await Promise.all(channels.map(async channel => {
    return channel.callStatistics()
      .then(promise => { return promise })
      .catch(err => err.log(err))
  }))

  console.log('SUCCESS: Fetched statistics for all channels')

  // Load Video Stats for all Channels
  await Promise.all(channels.map(async channel => {
    await channel.callFiftyNewestVideos()
      .then(async () => {
        console.log('SUCCESS: Fetched 50 newest videos for channel with the id ' + channel.channel_id)

        channel.videos.sort((a, b) => a.upload_time.getTime() - b.upload_time.getTime())

        for await (const video of channel.videos) {
          await video.callStatistics()
            .then(promise => {
              console.log('SUCCESS: Fetched statistics for the video with the id ' + video.video_id)
              return promise
            })
            .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err))
  }))

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
