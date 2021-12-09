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

export const getCurrentChannelFaceMaxSuccess = createSelector(
  selectChannel,
  state => {
    const faces = state.currentChannel.success_results.faces
    return max(merge(Object.keys(faces).map(key => Object.keys(faces[key]).map(key2 => faces[key][key2].meanSuccessFactor))))
  },
)

export const getCurrentChannelFaceMaxAmount = createSelector(
  selectChannel,
  state => {
    const faces = state.currentChannel.success_results.faces
    return max(merge(Object.keys(faces).map(key => Object.keys(faces[key]).map(key2 => faces[key][key2].amount))))
  },
)

export const getCurrentChannelTitleMaxSuccess = createSelector(
  selectChannel,
  state => {
    const titles = state.currentChannel.success_results.title
    return max(merge(Object.keys(titles).map(key => Object.keys(titles[key]).map(key2 => titles[key][key2].meanSuccessFactor))))
  },
)

export const getCurrentChannelTitleMaxAmount = createSelector(
  selectChannel,
  state => {
    const titles = state.currentChannel.success_results.title
    return max(merge(Object.keys(titles).map(key => Object.keys(titles[key]).map(key2 => titles[key][key2].amount))))
  },
)
