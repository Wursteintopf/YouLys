import express from 'express'
import bodyParser from 'body-parser'
import { channelRepository } from '../Api'

const channelRouter = express.Router()
channelRouter.use(bodyParser.json())

channelRouter.get('/getChannels', (req, res) => {
  channelRepository.getAll().then(channels => {
    res.send(channels)
  })
})

export default channelRouter
