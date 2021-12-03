import express from 'express'
import bodyParser from 'body-parser'
import { ApiStatusCodes } from '../../shared/Enums/ApiStatusCodes'
import moment from 'moment'
import { ChannelRepository } from '../Domain/Repository/ChannelRepository'
import { VideoRepository } from '../Domain/Repository/VideoRepository'
import { Channel } from '../Domain/Model/Channel'

const channelRouter = express.Router()
channelRouter.use(bodyParser.json())

channelRouter.get('/getChannels', (req, res) => {
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

channelRouter.get('/getChannelsWithNewestStats', (req, res) => {
  ChannelRepository.Instance.getAll()
    .then(async channels => {
      await Promise.all(channels.map(channel => channel.loadNewestStats().catch(e => console.error(e))))

      res.send({
        status: ApiStatusCodes.SUCCESS,
        result: channels.filter(channel => channel.statistics[0]),
      })
    })
    .catch(err => {
      console.log(err)
      res.send({
        status: ApiStatusCodes.UNKNOWN_SERVER_ERROR,
      })
    })
})

channelRouter.post('/getChannelWithStatsInRange', async (req, res) => {
  if (!req.body.channelId || !req.body.from || !req.body.to) {
    res.send({
      status: ApiStatusCodes.INSUFFICIENT_DATA_PROVIDED,
    })
  } else {
    const from = moment(req.body.from).subtract(1, 'days').toDate()
    const to = moment(req.body.to).add(1, 'days').toDate()

    let channel: Channel

    try {
      channel = await ChannelRepository.Instance.getById(req.body.channelId)
    } catch (e) {
      console.log(e)
      res.send({
        status: ApiStatusCodes.NOT_FOUND,
      })
      return
    }

    try {
      await channel.loadStatsInRange(from, to)

      channel.videos = await VideoRepository.Instance.getByChannelAndUploadTime(channel.channel_id, from, to)

      channel.calculateFaceSuccess()

      res.send({
        status: ApiStatusCodes.SUCCESS,
        result: channel,
      })
    } catch (e) {
      console.error(e)
      res.send({
        status: ApiStatusCodes.UNKNOWN_SERVER_ERROR,
      })
    }
  }
})

export default channelRouter
