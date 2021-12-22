import { put, select, takeEvery } from '@redux-saga/core/effects'
import {
  calculateCurrentWordWeights,
  fetchChannels,
  fetchCurrentChannel,
  fetchCurrentVideo,
  fetchVideos,
  setChannels,
  setCurrentChannelResult,
  setCurrentVideoResult,
  setCurrentWordWeights,
  setVideos,
} from './channel.actions'
import { baseUrl } from '../../../shared/paths'
import axios from 'axios'
import { ApiStatusCodes } from '../../../shared/Enums/ApiStatusCodes'
import {
  addChannelStatsFetched,
  addVideoStatsFetched,
  setChannelsFetched,
  setError,
  setFetching,
  setFetchingChannelStats,
  setVideosFetched,
} from '../ui/ui.actions'
import {
  getChannelsFetched,
  getChannelStatsFetched,
  getFetchingChannelStats,
  getFrom,
  getTo,
  getVideosFetched,
  getVideoStatsFetched,
} from '../ui/ui.selector'
import { getAllVideos } from './channel.selector'
import { calculateWordWeights } from '../../util/CalculateWordWeights'

const channelBaseUrl = baseUrl + '/channel'

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function * fetchChannelsSaga () {
  const channelsFetched = yield select(getChannelsFetched)
  if (channelsFetched) {
    yield put(setFetching(false))
    return
  }

  const response = yield axios.get(channelBaseUrl + '/getChannels')
  const data = yield response.data

  if (data.status !== ApiStatusCodes.SUCCESS) {
    yield put(setError(data.status))
  }

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

  if (data.status !== ApiStatusCodes.SUCCESS) {
    yield put(setError(data.status))
  }

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setVideos(data.result))
    yield put(setFetching(false))
    yield put(setVideosFetched())
    yield put(calculateCurrentWordWeights())
  } else if (data.status === ApiStatusCodes.TRY_AGAIN) {
    yield put(fetchVideos())
  }
}

function * fetchCurrentChannelSaga (action) {
  yield put(setFetchingChannelStats(true))
  const channelStatsFetched = yield select(getChannelStatsFetched)
  if (channelStatsFetched.includes(action.payload)) {
    yield put(setFetching(false))
    yield put(setFetchingChannelStats(false))
    return
  }

  const from = yield select(getFrom)
  const to = yield select(getTo)

  const response = yield axios.post(channelBaseUrl + '/getChannelStats', { channelId: action.payload, from: from, to: to })
  const data = yield response.data

  if (data.status !== ApiStatusCodes.SUCCESS) {
    yield put(setError(data.status))
  }

  if (data.status === ApiStatusCodes.SUCCESS) {
    data.result.statistics = data.result.statistics.map(stat => { return { ...stat, timestamp: new Date(stat.timestamp) } })

    yield put(setCurrentChannelResult(data.result))
    yield put(addChannelStatsFetched(action.payload))
    yield put(setFetching(false))
  }
  yield put(setFetchingChannelStats(false))
}

function * fetchCurrentVideoSaga (action) {
  const videoStatsFetched = yield select(getVideoStatsFetched)
  if (videoStatsFetched.includes(action.payload.videoId)) {
    yield put(setFetching(false))
    return
  }

  const isFetchingChannelStats = yield select(getFetchingChannelStats)
  if (isFetchingChannelStats) {
    yield sleep(100)
    yield put(fetchCurrentVideo(action.payload))
    return
  }

  const channelStatsFetched = yield select(getChannelStatsFetched)
  if (!channelStatsFetched.includes(action.payload.channelId)) {
    yield put(fetchCurrentChannel(action.payload.channelId))
    yield sleep(100)
    yield put(fetchCurrentVideo(action.payload))
    return
  }

  const from = yield select(getFrom)
  const to = yield select(getTo)

  const response = yield axios.post(channelBaseUrl + '/getVideoStats', { videoId: action.payload.videoId, from: from, to: to })
  const data = yield response.data

  data.result.statistics = data.result.statistics.map(stat => { return { ...stat, timestamp: new Date(stat.timestamp) } })

  if (data.status !== ApiStatusCodes.SUCCESS) {
    yield put(setError(data.status))
  } else {
    yield put(setCurrentVideoResult(data.result))
    yield put(addVideoStatsFetched(action.payload))
    yield put(setFetching(false))
  }
}

function * calculateCurrentWordWeightsSaga () {
  const allVideos = yield select(getAllVideos)
  const wordWeights = yield calculateWordWeights(allVideos)
  yield put(setCurrentWordWeights(wordWeights))
}

export function * watchChannelSagas () {
  yield takeEvery(fetchChannels, fetchChannelsSaga)
  yield takeEvery(fetchVideos, fetchVideosSaga)
  yield takeEvery(fetchCurrentChannel, fetchCurrentChannelSaga)
  yield takeEvery(fetchCurrentVideo, fetchCurrentVideoSaga)
  yield takeEvery(calculateCurrentWordWeights, calculateCurrentWordWeightsSaga)
}
