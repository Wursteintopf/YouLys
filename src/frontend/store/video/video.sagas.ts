import { put, takeEvery, select } from '@redux-saga/core/effects'
import { baseUrl } from '../../../shared/paths'
import axios from 'axios'
import { ApiStatusCodes } from '../../../shared/Enums/ApiStatusCodes'
import { setFetching } from '../ui/ui.actions'
import { getFrom, getTo } from '../ui/ui.selector'
import { fetchCurrentVideo, setCurrentVideo } from './video.actions'
import { setCurrentChannel } from '../channel/channel.actions'

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

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setCurrentVideo(data.result.video))
    yield put(setCurrentChannel(data.result.channel))
    yield put(setFetching(false))
  }
}

export function * watchVideoSagas () {
  yield takeEvery(fetchCurrentVideo, fetchCurrentVideoSaga)
}
