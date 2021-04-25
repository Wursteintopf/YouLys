import express from 'express'
import bodyParser from 'body-parser'
import {getChannelList, updateChannel} from './channelQueries'
import fetch from 'node-fetch'
import config from '../config'

const channelRouter = express.Router()
channelRouter.use(bodyParser.json())

channelRouter.get('/getChannels', (req, res) => {
  getChannelList().then(channels => {
    res.send(channels)
  })
})

channelRouter.get('/reloadSubs', ((req, res) => {
  getChannelList().then(channels => {
    channels.forEach(channel => {
      fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channel.id}&key=${config.apiKey}`)
        .then(apiRes => {
          return apiRes.json()
        })
        .then(data => {
          let subCount = data.items[0].statistics.subscriberCount;
          let channelName = data.items[0].snippet.title;
          updateChannel(channel.id, channelName, subCount)
        })
    })
  })
  res.send('Successfully updated SubCount.')
}))

export default channelRouter