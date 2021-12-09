import express from 'express'
import bodyParser from 'body-parser'
import { ApiStatusCodes } from '../../shared/Enums/ApiStatusCodes'
import moment from 'moment'
import { SuccessResultsInterface } from '../../shared/Domain/Model/ChannelSuccessResultsInterface'
import { VideoRepository } from '../Domain/Repository/VideoRepository'
import { calculateFaceSuccess } from '../SuccessCalculators/CalculateFaceSuccess'
import { calculateTitleSuccess } from '../SuccessCalculators/CalculateTitleSuccess'

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

    const videos = await VideoRepository.Instance.getByUploadTime(from, to)

    const success_result: SuccessResultsInterface = {
      amountOfVideosAnalyzed: videos.length,
      faces: calculateFaceSuccess(videos),
      title: calculateTitleSuccess(videos),
    }

    res.send({
      status: ApiStatusCodes.SUCCESS,
      result: success_result,
    })
  }
})

export default successRouter
