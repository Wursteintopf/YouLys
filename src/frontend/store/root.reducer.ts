import { combineReducers } from 'redux'
import { uiState } from './ui/ui.interfaces'
import { uiReducer } from './ui/ui.reducer'
import { channelState } from './channel/channel.interfaces'
import { channelReducer } from './channel/channel.reducer'

export interface RootState {
  ui: uiState
  channel: channelState
}

export const rootReducer = combineReducers<RootState>({
  ui: uiReducer,
  channel: channelReducer,
})
