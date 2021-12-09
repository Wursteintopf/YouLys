import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { successState } from './success.interfaces'
import { EMPTY_SUCCESS_RESULT } from '../../../shared/Domain/Model/ChannelSuccessResultsInterface'
import { setSuccess } from './success.actions'

const INITIAL_STATE: successState = {
  success: EMPTY_SUCCESS_RESULT,
}

export const successReducer = reducerWithInitialState(INITIAL_STATE)
  .case(setSuccess, (state, payload) => {
    return {
      ...state,
      success: payload,
    }
  })
