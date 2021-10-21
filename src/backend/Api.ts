import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import channelRouter from './Router/ChannelRouter'
import { ChannelRepository } from './Domain/Repository/ChannelRepository'
import { VideoRepository } from './Domain/Repository/VideoRepository'
import https from 'https'
import fs from 'fs'
import config from './Config'
import videoRouter from './Router/VideoRouter'

export const channelRepository = new ChannelRepository()
export const videoRepository = new VideoRepository()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/channel', channelRouter)
app.use('/video', videoRouter)

if (config.httpsConfig.https) {
  https.createServer({
    key: fs.readFileSync(config.httpsConfig.keyPath),
    cert: fs.readFileSync(config.httpsConfig.certPath),
  }, app).listen(config.httpsConfig.port)
} else {
  app.listen(3001, () => {
    console.log('Listening on port 3001.')
  })
}
