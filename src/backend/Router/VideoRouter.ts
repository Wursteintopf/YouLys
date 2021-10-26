import express from 'express'
import bodyParser from 'body-parser'
import { ApiStatusCodes } from '../../shared/Enums/ApiStatusCodes'
import moment from 'moment'
import { VideoRepository } from '../Domain/Repository/VideoRepository'
import { ChannelRepository } from '../Domain/Repository/ChannelRepository'

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

    VideoRepository.Instance.getById(req.body.videoId)
      .then(async video => {
        await video.loadStatsInRange(from, to)

        if (video.channel_id) {
          ChannelRepository.Instance.getById(video.channel_id)
            .then(async channel => {
              await channel.loadNewestStats()

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
