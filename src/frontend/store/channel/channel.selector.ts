import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'
import { EMPTY_CHANNEL_STATISTIC } from '../../../shared/Domain/Model/ChannelStatisticInterface'
import { max, merge } from 'd3-array'

const selectChannel = (state: RootState) => state.channel

export const getChannels = createSelector(
  selectChannel,
  state => state.channels,
)

export const getCurrentChannel = createSelector(
  selectChannel,
  state => state.currentChannel,
)

export const getNewestChannelStatistic = createSelector(
  selectChannel,
  state => {
    if (state.currentChannel.statistics.length > 0) {
      return state.currentChannel.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0]
    } else return EMPTY_CHANNEL_STATISTIC
  },
)

export const getCurrentChannelSuccessResults = createSelector(
  selectChannel,
  state => state.currentChannel.success_results,
)

export const getCurrentChannelFaceSuccess = createSelector(
  selectChannel,
  state => state.currentChannel.success_results.faces,
)

export const getCurrentChannelFaceMaxSuccess = createSelector(
  getCurrentChannelFaceSuccess,
  state => {
    return max(merge(Object.keys(state).map(key => Object.keys(state[key]).map(key2 => state[key][key2].meanSuccessFactor))))
  },
)

export const getCurrentChannelFaceMaxAmount = createSelector(
  getCurrentChannelFaceSuccess,
  state => {
    return max(merge(Object.keys(state).map(key => Object.keys(state[key]).map(key2 => state[key][key2].amount))))
  },
)
