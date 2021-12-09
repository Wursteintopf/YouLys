import { put, select, takeEvery } from '@redux-saga/core/effects'
import { fetchSuccess, setSuccess } from './success.actions'
import { baseUrl } from '../../../shared/paths'
import axios from 'axios'
import { getFrom, getTo } from '../ui/ui.selector'
import { ApiStatusCodes } from '../../../shared/Enums/ApiStatusCodes'
import { setFetching } from '../ui/ui.actions'

const channelBaseUrl = baseUrl + '/success'

function * fetchSuccessSaga () {
  const from = yield select(getFrom)
  const to = yield select(getTo)

  const requestData = {
    from: from,
    to: to,
  }

  const response = yield axios.post(channelBaseUrl + '/getSuccessInRange', requestData)
  const data = yield response.data

  if (data.status === ApiStatusCodes.SUCCESS) {
    yield put(setSuccess(data.result))
    yield put(setFetching(false))
  }
}

export function * watchSuccessSagas () {
  yield takeEvery(fetchSuccess, fetchSuccessSaga)
}
