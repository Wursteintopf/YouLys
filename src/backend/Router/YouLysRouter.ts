import express from 'express'
import bodyParser from 'body-parser'
import { ApiStatusCodes } from '../../shared/Enums/ApiStatusCodes'
import moment from 'moment'
import { ChannelRepository } from '../Domain/Repository/ChannelRepository'
import { VideoRepository } from '../Domain/Repository/VideoRepository'

const youLysRouter = express.Router()
youLysRouter.use(bodyParser.json())

youLysRouter.get('/getChannels', (req, res) => {
  ChannelRepository.Instance.getAll()
    .then(channels => {
      res.send({
        status: ApiStatusCodes.SUCCESS,
        result: channels,
      })
    })
    .catch(err => {
      console.log(err)
      res.send({
        status: ApiStatusCodes.UNKNOWN_SERVER_ERROR,
      })
    })
})

youLysRouter.post('/getVideos', (req, res) => {
  if (!req.body.from || !req.body.to) {
    res.send({
      status: ApiStatusCodes.INSUFFICIENT_DATA_PROVIDED,
    })
  } else {
    const from = moment(req.body.from).subtract(1, 'days').toDate()
    const to = moment(req.body.to).add(1, 'days').toDate()

    ChannelRepository.Instance.getAllWithVideosInRange(from, to)
      .then(channels => {
        res.send({
          status: ApiStatusCodes.SUCCESS,
          result: channels,
        })
      })
      .catch(err => {
        console.log(err)
        if (err.message === ApiStatusCodes.TRY_AGAIN) {
          res.send({
            status: ApiStatusCodes.TRY_AGAIN,
          })
        } else {
          res.send({
            status: ApiStatusCodes.UNKNOWN_SERVER_ERROR,
          })
        }
      })
  }
})

youLysRouter.post('/getChannelStats', async (req, res) => {
  if (!req.body.channelId || !req.body.from || !req.body.to) {
    res.send({
      status: ApiStatusCodes.INSUFFICIENT_DATA_PROVIDED,
    })
  } else {
    const from = moment(req.body.from).subtract(1, 'days').toDate()
    const to = moment(req.body.to).add(1, 'days').toDate()

    ChannelRepository.Instance.getById(req.body.channelId)
      .then(async channel => {
        await channel.loadStatsInRange(from, to)

        channel.videos = await VideoRepository.Instance.getByChannelAndUploadTime(channel.channel_id, from, to)

        res.send({
          status: ApiStatusCodes.SUCCESS,
          result: channel,
        })
      })
      .catch(() => {
        res.send({
          status: ApiStatusCodes.NOT_FOUND,
        })
      })
  }
})

youLysRouter.post('/getVideoStats', (req, res) => {
  if (!req.body.videoId || !req.body.from || !req.body.to) {
    res.send({
      status: ApiStatusCodes.INSUFFICIENT_DATA_PROVIDED,
    })
  } else {
    const from = moment(req.body.from).subtract(1, 'days').toDate()
    const to = moment(req.body.to).add(1, 'days').toDate()

    VideoRepository.Instance.getById(req.body.videoId)
      .then(async video => {
        await video.loadStatsInRange(from, to)

        if (video.statistics.length === 0) await video.loadNewestStats()

        res.send({
          status: ApiStatusCodes.SUCCESS,
          result: video,
        })
      })
      .catch(() => {
        res.send({
          status: ApiStatusCodes.NOT_FOUND,
        })
      })
  }
})

export default youLysRouter
