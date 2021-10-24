import { ChannelRepository } from './Domain/Repository/ChannelRepository'
import { connection } from './Helper/DatabaseHelper'
import { ChannelMeta } from './Domain/Model/ChannelMeta'
import { ChannelStatistic } from './Domain/Model/ChannelStatistic'
import { VideoRepository } from './Domain/Repository/VideoRepository'
import { VideoMeta } from './Domain/Model/VideoMeta'
import { VideoThumbnail } from './Domain/Model/VideoThumbnail'
import { Video } from './Domain/Model/Video'
import { VideoStatistic } from './Domain/Model/VideoStatistic'

const getStatsById = async (videoId): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    connection.query(
      'SELECT * FROM zzz_video_statistic WHERE video_id = ? ORDER BY timestamp',
      [videoId],

      (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      },
    )
  })
}

const getExistingMeta = async (meta: VideoMeta): Promise<VideoMeta> => {
  return new Promise<VideoMeta>((resolve, reject) => {
    connection.query(
      'SELECT * FROM video_meta WHERE (title = ?) AND (description = ?) AND (tags = ?)',
      [meta.title, meta.description, meta.tags],

      (err, rows) => {
        if (err) reject(err)
        if (rows && rows.length > 0) {
          resolve(new VideoMeta(rows[0]))
        } else {
          reject(new Error('Not found'))
        }
      },
    )
  })
}

const getExistingThumb = async (thumb: VideoThumbnail): Promise<VideoThumbnail> => {
  return new Promise<VideoThumbnail>((resolve, reject) => {
    connection.query(
      'SELECT * FROM video_thumbnail WHERE (thumbnail = ?)',
      [thumb.thumbnail],

      (err, rows) => {
        if (err) reject(err)
        if (rows && rows.length > 0) {
          resolve(new VideoThumbnail(rows[0]))
        } else {
          reject(new Error('Not found'))
        }
      },
    )
  })
}

const migrate = async (): Promise<boolean> => {
  const videos = await VideoRepository.Instance.getAll()

  for await (const video of videos) {
    const stats = await getStatsById(video.video_id)

    for await (const oldStat of stats) {
      const meta = new VideoMeta({
        video_meta_id: 0,
        title: oldStat.title,
        description: oldStat.description,
        tags: oldStat.tags,
      })

      await getExistingMeta(meta)
        .then(() => {})
        .catch(async () => {
          await VideoRepository.Instance.saveMeta(meta)
        })
    }

    console.log('Metas migrated for video with the id ' + video.video_id)

    for await (const oldStat of stats) {
      const thumb = new VideoThumbnail({
        video_thumbnail_id: 0,
        thumbnail: oldStat.thumbnail,
      })

      await getExistingThumb(thumb)
        .then(() => {})
        .catch(async () => {
          await VideoRepository.Instance.saveThumbnail(thumb)
        })
    }

    console.log('Thumbnails migrated for video with the id ' + video.video_id)

    for await (const oldStat of stats) {
      const meta = new VideoMeta({
        video_meta_id: 0,
        title: oldStat.title,
        description: oldStat.description,
        tags: oldStat.tags,
      })

      const thumb = new VideoThumbnail({
        video_thumbnail_id: 0,
        thumbnail: oldStat.thumbnail,
      })

      await getExistingMeta(meta)
        .then(async exMeta => {
          await getExistingThumb(thumb)
            .then(async exThumb => {
              const stat = new VideoStatistic({
                video_statistic_id: 0,
                video_meta: exMeta,
                video_thumbnail: exThumb,
                commentCount: oldStat.commentCount,
                dislikes: oldStat.dislikes,
                favouriteCount: oldStat.favouriteCount,
                likes: oldStat.likes,
                timestamp: oldStat.timestamp,
                video_id: oldStat.video_id,
                views: oldStat.views,
              })

              await VideoRepository.Instance.migrateStatistic(stat)
            })
        })
    }

    console.log('Stats migrated for video with the id ' + video.video_id)
  }

  return true
}

migrate()
  .then(() => {
    console.log('SUCCESS: Successfully migrated data')
    process.exit(1)
  })
  .catch(err => {
    console.log(err)
    process.exit(0)
  })
