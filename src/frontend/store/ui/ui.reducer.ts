import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { uiState } from './ui.interfaces'
import { TimeRange } from '../../../shared/Enums/TimeRange'
import { setFrom, setRange, setTo } from './ui.actions'

const INITIAL_STATE: uiState = {
  range: TimeRange.LAST_28_DAYS,
  from: new Date(),
  to: new Date(),
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
