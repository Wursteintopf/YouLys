import { put, takeEvery, select } from '@redux-saga/core/effects'
import {
  fetchChannels,
  fetchCurrentChannel, fetchCurrentVideo,
  fetchVideos,
  setChannels, setCurrentChannel,
  setCurrentChannelResult, setCurrentVideoResult,
  setVideos,
} from './channel.actions'
import { baseUrl } from '../../../shared/paths'
import axios from 'axios'
import { ApiStatusCodes } from '../../../shared/Enums/ApiStatusCodes'
import {
  addChannelStatsFetched, addVideoStatsFetched,
  setChannelsFetched,
  setFetching,
  setVideosFetched,
} from '../ui/ui.actions'
import {
  getChannelsFetched,
  getChannelStatsFetched,
  getFrom,
  getTo,
  getVideosFetched,
  getVideoStatsFetched,
} from '../ui/ui.selector'

const channelBaseUrl = baseUrl + '/channel'

function * fetchChannelsSaga () {
  const channelsFetched = yield select(getChannelsFetched)
  if (channelsFetched) {
    yield put(setFetching(false))
    return
  }

  const response = yield axios.get(channelBaseUrl + '/getChannels')
  const data = yield response.data

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setChannels(data.result))
    yield put(setFetching(false))
    yield put(setChannelsFetched())
  }
}

function * fetchVideosSaga () {
  const videosFetched = yield select(getVideosFetched)
  if (videosFetched) {
    yield put(setFetching(false))
    return
  }

  const from = yield select(getFrom)
  const to = yield select(getTo)

  const response = yield axios.post(channelBaseUrl + '/getVideos', { from: from, to: to })
  const data = yield response.data

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setVideos(data.result))
    yield put(setFetching(false))
    yield put(setVideosFetched())
  }
}

function * fetchCurrentChannelSaga (action) {
  const channelStatsFetched = yield select(getChannelStatsFetched)
  if (channelStatsFetched.includes(action.payload)) {
    yield put(setFetching(false))
    return
  }

  const from = yield select(getFrom)
  const to = yield select(getTo)

  const response = yield axios.post(channelBaseUrl + '/getChannelStats', { channelId: action.payload, from: from, to: to })
  const data = yield response.data

  data.result.statistics = data.result.statistics.map(stat => { return { ...stat, timestamp: new Date(stat.timestamp) } })

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setCurrentChannelResult(data.result))
    yield put(addChannelStatsFetched(action.payload))
    yield put(setFetching(false))
  }
}

function * fetchCurrentVideoSaga (action) {
  const videoStatsFetched = yield select(getVideoStatsFetched)
  if (videoStatsFetched.includes(action.payload)) {
    yield put(setFetching(false))
    return
  }

  const from = yield select(getFrom)
  const to = yield select(getTo)

  const response = yield axios.post(channelBaseUrl + '/getVideoStats', { videoId: action.payload, from: from, to: to })
  const data = yield response.data

  data.result.statistics = data.result.statistics.map(stat => { return { ...stat, timestamp: new Date(stat.timestamp) } })

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setCurrentVideoResult(data.result))
    yield put(addVideoStatsFetched(action.payload))
    yield put(setFetching(false))
  }
}

export function * watchChannelSagas () {
  yield takeEvery(fetchChannels, fetchChannelsSaga)
  yield takeEvery(fetchVideos, fetchVideosSaga)
  yield takeEvery(fetchCurrentChannel, fetchCurrentChannelSaga)
  yield takeEvery(fetchCurrentVideo, fetchCurrentVideoSaga)
}
