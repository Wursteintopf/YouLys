import express from 'express'
import bodyParser from 'body-parser'
import { channelRepository } from '../Api'
import { StatusCodes } from '../../shared/Enums/StatusCodes'
import { TimeRange } from '../../shared/Enums/TimeRange'
import moment from 'moment'

const channelRouter = express.Router()
channelRouter.use(bodyParser.json())

channelRouter.get('/getChannels', (req, res) => {
  channelRepository.getAll()
    .then(channels => {
      res.send({
        status: StatusCodes.SUCCESS,
        result: channels,
      })
    })
    .catch(err => {
      console.log(err)
      res.send({
        status: StatusCodes.UNKNOWN_SERVER_ERROR,
      })
    })
})

channelRouter.get('/getChannelsWithNewestStats', (req, res) => {
  channelRepository.getAllWithNewestStats()
    .then(channels => {
      res.send({
        status: StatusCodes.SUCCESS,
        result: channels,
      })
    })
    .catch(err => {
      console.log(err)
      res.send({
        status: StatusCodes.UNKNOWN_SERVER_ERROR,
      })
    })
})

channelRouter.post('/getChannelWithStatsInRange', (req, res) => {
  if (!req.body.channelId || !req.body.from || !req.body.to) {
    res.send({
      status: StatusCodes.INSUFFICIENT_DATA_PROVIDED,
    })
  } else {
    channelRepository.getByIdWithStatsInRange(req.body.channelId, moment(req.body.from).subtract(2, 'days').toDate(), new Date(req.body.to))
      .then(channels => {
        res.send({
          status: StatusCodes.SUCCESS,
          result: channels,
        })
      })
      .catch(err => {
        console.log(err)
        res.send({
          status: StatusCodes.UNKNOWN_SERVER_ERROR,
        })
      })
  }
})

export default channelRouter
