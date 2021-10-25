import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { EMPTY_VIDEO } from '../../../shared/Domain/Model/VideoInterface'
import { videoState } from './video.interfaces'
import { setCurrentVideo } from './video.actions'

const INITIAL_STATE: videoState = {
  currentVideo: EMPTY_VIDEO,
}

export const videoReducer = reducerWithInitialState(INITIAL_STATE)
  .case(setCurrentVideo, (state, payload) => {
    return {
      ...state,
      currentVideo: payload,
    }
  })
