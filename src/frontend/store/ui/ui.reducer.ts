import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { uiState } from './ui.interfaces'
import { TimeRange } from '../../../shared/Enums/TimeRange'
import {
  addChannelStatsFetched,
  addVideoStatsFetched, resetError,
  setChannelsFetched, setError,
  setFetching, setFetchingChannelStats,
  setFrom,
  setRange,
  setTo,
  setVideosFetched,
} from './ui.actions'
import moment from 'moment'

const INITIAL_STATE: uiState = {
  range: TimeRange.LAST_90_DAYS,
  from: moment().subtract(90, 'days').startOf('day').toDate(),
  to: moment().startOf('day').toDate(),
  fetching: false,
  isFetchingChannelStats: false,
  channelsFetched: false,
  videosFetched: false,
  channelStatsFetched: [],
  videoStatsFetched: [],
  error: undefined,
}

export const uiReducer = reducerWithInitialState(INITIAL_STATE)
  .case(setRange, (state, payload) => {
    return {
      ...state,
      range: payload,
      videosFetched: false,
      channelStatsFetched: [],
      videoStatsFetched: [],
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
  .case(setVideosFetched, state => {
    return {
      ...state,
      videosFetched: true,
    }
  })
  .case(addChannelStatsFetched, (state, payload) => {
    return {
      ...state,
      channelStatsFetched: [...state.channelStatsFetched, payload],
    }
  })
  .case(addVideoStatsFetched, (state, payload) => {
    return {
      ...state,
      videoStatsFetched: [...state.videoStatsFetched, payload],
    }
  })
  .case(setFetchingChannelStats, (state, payload) => {
    return {
      ...state,
      isFetchingChannelStats: payload,
    }
  })
  .case(setError, (state, payload) => {
    return {
      ...state,
      error: payload,
    }
  })
  .case(resetError, (state, payload) => {
    return {
      ...state,
      error: undefined,
    }
  })
