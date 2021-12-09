import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { uiState } from './ui.interfaces'
import { TimeRange } from '../../../shared/Enums/TimeRange'
import { setChannelsFetched, setFetching, setFrom, setRange, setTo } from './ui.actions'
import moment from 'moment'

const INITIAL_STATE: uiState = {
  range: TimeRange.LAST_90_DAYS,
  from: moment().subtract(90, 'days').startOf('day').toDate(),
  to: moment().startOf('day').toDate(),
  fetching: false,
  channelsFetched: false,
}

export const uiReducer = reducerWithInitialState(INITIAL_STATE)
  .case(setRange, (state, payload) => {
    return {
      ...state,
      range: payload,
    }
  })
  .case(setFrom, (state, payload) => {
    return {
      ...state,
      from: payload,
    }
  })
  .case(setTo, (state, payload) => {
    return {
      ...state,
      to: payload,
    }
  })
  .case(setFetching, (state, payload) => {
    return {
      ...state,
      fetching: payload,
    }
  })
  .case(setChannelsFetched, (state) => {
    return {
      ...state,
      channelsFetched: true,
    }
  })
