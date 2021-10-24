import express from 'express'
import bodyParser from 'body-parser'
import { ApiStatusCodes } from '../../shared/Enums/StatusCodes'
import moment from 'moment'
import { channelRepository, videoRepository } from '../Api'

const videoRouter = express.Router()
videoRouter.use(bodyParser.json())

videoRouter.post('/getVideoWithStatsInRange', (req, res) => {
  if (!req.body.videoId || !req.body.from || !req.body.to) {
    res.send({
      status: ApiStatusCodes.INSUFFICIENT_DATA_PROVIDED,
    })
  } else {
    const from = moment(req.body.from).subtract(1, 'days').toDate()
    const to = moment(req.body.to).add(1, 'days').toDate()

    videoRepository.getByIdWithStatsInRange(req.body.videoId, from, to)
      .then(video => {
        if (video.channel_id) {
          channelRepository.getByIdWithNewestStats(video.channel_id)
            .then(channel => {
              res.send({
                status: ApiStatusCodes.SUCCESS,
                result: {
                  video: video,
                  channel: channel,
                },
              })
            })
        } else {
          res.send({
            status: ApiStatusCodes.NOT_FOUND,
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.send({
          status: ApiStatusCodes.UNKNOWN_SERVER_ERROR,
        })
      })
  }
})

export default videoRouter
