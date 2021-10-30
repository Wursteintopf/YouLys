import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'
import { EMPTY_VIDEO_STATISTIC } from '../../../shared/Domain/Model/VideoStatisticInterface'

const selectVideo = (state: RootState) => state.video

export const getCurrentVideo = createSelector(
  selectVideo,
  state => state.currentVideo,
)

export const getNewestVideoStatistic = createSelector(
  selectVideo,
  state => {
    if (state.currentVideo.statistics.length > 0) {
      return state.currentVideo.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0]
    } else return EMPTY_VIDEO_STATISTIC
  },
)
