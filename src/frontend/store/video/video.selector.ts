import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'

const selectVideo = (state: RootState) => state.video

export const getCurrentVideo = createSelector(
  selectVideo,
  state => state.currentVideo,
)
