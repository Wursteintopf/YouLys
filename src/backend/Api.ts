import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import youLysRouter from './Router/YouLysRouter'
import https from 'https'
import fs from 'fs'
import config from './Config'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/channel', youLysRouter)

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
