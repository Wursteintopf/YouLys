import express from 'express'
import bodyParser from 'body-parser'
import { channelRepository, videoRepository } from '../Api'
import { ApiStatusCodes } from '../../shared/Enums/StatusCodes'
import { TimeRange } from '../../shared/Enums/TimeRange'
import moment from 'moment'

const channelRouter = express.Router()
channelRouter.use(bodyParser.json())

channelRouter.get('/getChannels', (req, res) => {
  channelRepository.getAll()
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
  channelRepository.getAllWithNewestStats()
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

channelRouter.post('/getChannelWithStatsInRange', (req, res) => {
  if (!req.body.channelId || !req.body.from || !req.body.to) {
    res.send({
      status: ApiStatusCodes.INSUFFICIENT_DATA_PROVIDED,
    })
  } else {
    const from = moment(req.body.from).subtract(1, 'days').toDate()
    const to = moment(req.body.to).add(1, 'days').toDate()

    channelRepository.getByIdWithStatsInRange(req.body.channelId, from, to)
      .then(channel => {
        videoRepository.getByChannelInRangeWithNewestStats(channel.channel_id, from, to)
          .then(videos => {
            channel.videos = videos
            res.send({
              status: ApiStatusCodes.SUCCESS,
              result: channel,
            })
          })
          .catch(err => {
            console.log(err)
            res.send({
              status: ApiStatusCodes.UNKNOWN_SERVER_ERROR,
            })
          })
      })
      .catch(err => {
        console.log(err)
        res.send({
          status: ApiStatusCodes.UNKNOWN_SERVER_ERROR,
        })
      })
  }
})

export default channelRouter
