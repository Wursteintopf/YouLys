import { combineReducers } from 'redux'
import { uiState } from './ui/ui.interfaces'
import { uiReducer } from './ui/ui.reducer'

export interface RootState {
  ui: uiState
}

export const rootReducer = combineReducers<RootState>({
  ui: uiReducer,
})
