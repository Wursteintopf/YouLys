import { put, takeEvery, select } from '@redux-saga/core/effects'
import { fetchChannels, fetchCurrentChannel, setChannels, setCurrentChannel } from './channel.actions'
import { baseUrl } from '../../../shared/paths'
import axios from 'axios'
import { ApiStatusCodes } from '../../../shared/Enums/ApiStatusCodes'
import { setFetching } from '../ui/ui.actions'
import { getFrom, getTo } from '../ui/ui.selector'

const channelBaseUrl = baseUrl + '/channel'

function * fetchChannelsSaga () {
  const response = yield axios.get(channelBaseUrl + '/getChannelsWithNewestStats')
  const data = yield response.data

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setChannels(data.result))
    yield put(setFetching(false))
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

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setCurrentChannel(data.result))
    yield put(setFetching(false))
  }
}

export function * watchChannelSagas () {
  yield takeEvery(fetchChannels, fetchChannelsSaga)
  yield takeEvery(fetchCurrentChannel, fetchCurrentChannelSaga)
}
