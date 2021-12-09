import { put, takeEvery, select } from '@redux-saga/core/effects'
import { fetchChannels, fetchCurrentChannel, setChannels, setCurrentChannel } from './channel.actions'
import { baseUrl } from '../../../shared/paths'
import axios from 'axios'
import { ApiStatusCodes } from '../../../shared/Enums/ApiStatusCodes'
import { setChannelsFetched, setFetching } from '../ui/ui.actions'
import { getChannelsFetched, getFrom, getTo } from '../ui/ui.selector'

const channelBaseUrl = baseUrl + '/channel'

function * fetchChannelsSaga () {
  const channelsFetched = yield select(getChannelsFetched)
  if (channelsFetched) {
    yield put(setFetching(false))
    return
  }

  const response = yield axios.get(channelBaseUrl + '/getChannelsWithNewestStats')
  const data = yield response.data

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setChannels(data.result))
    yield put(setFetching(false))
    yield put(setChannelsFetched())
  }
}

function * fetchCurrentChannelSaga (action) {
  const from = yield select(getFrom)
  const to = yield select(getTo)
  const requestData = {
    channelId: action.payload,
    from: from,
    to: to,
  }
  const response = yield axios.post(channelBaseUrl + '/getChannelWithStatsInRange', requestData)
  const data = yield response.data

  data.result.statistics = data.result.statistics.map(stat => { return { ...stat, timestamp: new Date(stat.timestamp) } })

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setCurrentChannel(data.result))
    yield put(setFetching(false))
  }
}

export function * watchChannelSagas () {
  yield takeEvery(fetchChannels, fetchChannelsSaga)
  yield takeEvery(fetchCurrentChannel, fetchCurrentChannelSaga)
}
