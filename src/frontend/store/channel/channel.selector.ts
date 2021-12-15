import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'
import { EMPTY_CHANNEL_STATISTIC } from '../../../shared/Domain/Model/ChannelStatisticInterface'
import { max, merge } from 'd3-array'
import { calculateFaceSuccess } from '../../util/CalculateFaceSuccess'
import { calculateTitleSuccess } from '../../util/CalculateTitleSuccess'
import { EMPTY_CHANNEL } from '../../../shared/Domain/Model/ChannelInterface'
import { EMPTY_VIDEO } from '../../../shared/Domain/Model/VideoInterface'
import { calculateAveragePerformance } from '../../util/CalculateAveragePerformance'

const selectChannel = (state: RootState) => state.channel

export const getChannels = createSelector(
  selectChannel,
  state => Object.keys(state.channels).map(key => state.channels[key]),
)

export const getCurrentChannel = createSelector(
  selectChannel,
  state => state.currentChannel ? state.channels[state.currentChannel] : EMPTY_CHANNEL,
)

export const getCurrentChannelAveragePerformance = createSelector(
  getCurrentChannel,
  state => calculateAveragePerformance(state.videos),
)

export const getNewestChannelStatistic = createSelector(
  getCurrentChannel,
  state => {
    if (state.statistics.length > 0) {
      return state.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0]
    } else return EMPTY_CHANNEL_STATISTIC
  },
)

export const getCurrentChannelFaceSuccess = createSelector(
  getCurrentChannel,
  state => calculateFaceSuccess(state.videos),
)

export const getCurrentChannelTitleSuccess = createSelector(
  getCurrentChannel,
  state => calculateTitleSuccess(state.videos),
)

export const getAllVideos = createSelector(
  selectChannel,
  state => merge(Object.keys(state.channels).map(key => state.channels[key].videos)),
)

export const getAmountOfVideos = createSelector(
  getAllVideos,
  state => state.length,
)

export const getFaceSuccess = createSelector(
  getAllVideos,
  state => calculateFaceSuccess(state),
)

export const getTitleSuccess = createSelector(
  getAllVideos,
  state => calculateTitleSuccess(state),
)

export const getCurrentVideo = createSelector(
  selectChannel,
  state => {
    if (!state.currentChannel || !state.currentVideo || !state.channels[state.currentChannel] || !state.channels[state.currentChannel].videos[state.currentVideo]) return EMPTY_VIDEO
    else return state.channels[state.currentChannel].videos[state.currentVideo]
  },
)

export const getNewestVideoStatistic = createSelector(
  getCurrentVideo,
  state => {
    if (state.statistics.length > 0) {
      return state.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0]
    } else return EMPTY_CHANNEL_STATISTIC
  },
)
