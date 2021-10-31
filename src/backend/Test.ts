import { VideoRepository } from './Domain/Repository/VideoRepository'

const run = async () => {
  const video = await VideoRepository.Instance.getById('YJDBZYIqcc4')
  await video.loadNewestStats()
  await video.statistics[0].video_thumbnail.detectFaces()
  process.exit(0)
}

run()
