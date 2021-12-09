import { combineReducers } from 'redux'
import { uiState } from './ui/ui.interfaces'
import { uiReducer } from './ui/ui.reducer'
import { channelState } from './channel/channel.interfaces'
import { channelReducer } from './channel/channel.reducer'
import { videoState } from './video/video.interfaces'
import { videoReducer } from './video/video.reducer'
import { successState } from './success/success.interfaces'
import { successReducer } from './success/success.reducer'

export interface RootState {
  ui: uiState
  channel: channelState
  video: videoState
  success: successState
}

export const rootReducer = combineReducers<RootState>({
  ui: uiReducer,
  channel: channelReducer,
  video: videoReducer,
  success: successReducer,
})
