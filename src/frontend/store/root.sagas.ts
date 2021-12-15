import { all } from 'redux-saga/effects'
import { watchChannelSagas } from './channel/channel.sagas'

export default function * rootSaga () {
  yield all([
    watchChannelSagas(),
  ])
}
