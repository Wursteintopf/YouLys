import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import channelRouter from './channels/channelRouter'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/channels', channelRouter)

app.listen(3001, () => {
  console.log('Listening on port 3001.')
})
