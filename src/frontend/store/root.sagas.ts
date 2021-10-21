import { all } from 'redux-saga/effects'
import { watchChannelSagas } from './channel/channel.sagas'
import { watchVideoSagas } from './video/video.sagas'

export default function * rootSaga () {
  yield all([
    watchChannelSagas(),
    watchVideoSagas(),
  ])
}
