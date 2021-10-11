import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import channelRouter from './Router/ChannelRouter'
import { ChannelRepository } from './Domain/Repository/ChannelRepository'
import { VideoRepository } from './Domain/Repository/VideoRepository'

export const channelRepository = new ChannelRepository()
export const videoRepository = new VideoRepository()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/channel', channelRouter)

app.listen(3001, () => {
  console.log('Listening on port 3001.')
})
