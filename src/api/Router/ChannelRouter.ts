import express from 'express'
import bodyParser from 'body-parser'
import {getChannelList, updateChannel} from '../Database/ChannelQueries'
import fetch from 'node-fetch'
import config from '../Config'

const channelRouter = express.Router()
channelRouter.use(bodyParser.json())

channelRouter.get('/getChannels', (req, res) => {
  getChannelList().then(channels => {
    res.send(channels)
  })
})

export default channelRouter