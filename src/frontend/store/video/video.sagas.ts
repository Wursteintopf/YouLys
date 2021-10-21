import { put, takeEvery, select } from '@redux-saga/core/effects'
import { baseUrl } from '../../../shared/paths'
import axios from 'axios'
import { StatusCodes } from '../../../shared/Enums/StatusCodes'
import { setFetching } from '../ui/ui.actions'
import { getFrom, getRange, getTo } from '../ui/ui.selector'
import { fetchCurrentVideo, setCurrentVideo } from './video.actions'

const channelBaseUrl = baseUrl + '/video'

function * fetchCurrentVideoSaga (action) {
  const from = yield select(getFrom)
  const to = yield select(getTo)
  const requestData = {
    videoId: action.payload,
    from: from,
    to: to,
  }
  const response = yield axios.post(channelBaseUrl + '/getVideoWithStatsInRange', requestData)
  const data = yield response.data

  if (data.status === StatusCodes.SUCCESS) {
    yield put(setCurrentVideo(data.result))
    yield put(setFetching(false))
  }
}

export function * watchVideoSagas () {
  yield takeEvery(fetchCurrentVideo, fetchCurrentVideoSaga)
}
