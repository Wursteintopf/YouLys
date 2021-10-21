import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'

const selectChannel = (state: RootState) => state.channel

export const getChannels = createSelector(
  selectChannel,
  state => state.channels,
)

export const getCurrentChannel = createSelector(
  selectChannel,
  state => state.currentChannel,
)
