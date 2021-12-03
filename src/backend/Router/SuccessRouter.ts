import express from 'express'
import bodyParser from 'body-parser'
import { ApiStatusCodes } from '../../shared/Enums/ApiStatusCodes'
import moment from 'moment'
import { ChannelRepository } from '../Domain/Repository/ChannelRepository'

const successRouter = express.Router()
successRouter.use(bodyParser.json())

successRouter.post('/getSuccessInRange', async (req, res) => {
  if (!req.body.from || !req.body.to) {
    res.send({
      status: ApiStatusCodes.INSUFFICIENT_DATA_PROVIDED,
    })
  } else {
    const from = moment(req.body.from).subtract(1, 'days').toDate()
    const to = moment(req.body.to).add(1, 'days').toDate()

    const channels = await ChannelRepository.Instance.getAll()


  }
})

export default successRouter
