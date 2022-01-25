import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'
import { EMPTY_CHANNEL_STATISTIC } from '../../../shared/Domain/Model/ChannelStatisticInterface'
import { merge } from 'd3-array'
import { calculateFaceSuccess } from '../../util/CalculateFaceSuccess'
import { calculateTitleSuccess } from '../../util/CalculateTitleSuccess'
import { EMPTY_CHANNEL } from '../../../shared/Domain/Model/ChannelInterface'
import { EMPTY_VIDEO } from '../../../shared/Domain/Model/VideoInterface'
import { calculateAveragePerformance } from '../../util/CalculateAveragePerformance'
import { calculateObjectSuccess } from '../../util/CalculateObjectSuccess'
import { calculateWordWeights } from '../../util/CalculateWordWeights'
import { EMPTY_VIDEO_STATISTIC } from '../../../shared/Domain/Model/VideoStatisticInterface'

const selectChannel = (state: RootState) => state.channel

export const getChannels = createSelector(
  selectChannel,
  state => Object.keys(state.channels).map(key => state.channels[key]),
)

export const getSuccessfulChannels = createSelector(
  getChannels,
  channels => channels.filter(c => Object.keys(c.videos).length > 0).sort((a, b) => b.statistics[0].channel_success_factor - a.statistics[0].channel_success_factor).slice(0, 3),
)

export const getCurrentChannel = createSelector(
  selectChannel,
  state => state.currentChannel ? state.channels[state.currentChannel] : EMPTY_CHANNEL,
)

export const getCurrentChannelVideos = createSelector(
  getCurrentChannel,
  channel => Object.keys(channel.videos).map(key => channel.videos[key]),
)

export const getCurrentChannelAveragePerformance = createSelector(
  getCurrentChannelVideos,
  videos => calculateAveragePerformance(videos),
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
  getCurrentChannelVideos,
  videos => calculateFaceSuccess(videos),
)

export const getCurrentChannelTitleSuccess = createSelector(
  getCurrentChannelVideos,
  videos => calculateTitleSuccess(videos),
)

export const getCurrentChannelTitleWordWeights = createSelector(
  getCurrentChannelVideos,
  videos => calculateWordWeights(videos),
)

export const getCurrentChannelClickbaitObjectSuccess = createSelector(
  getCurrentChannelVideos,
  videos => calculateObjectSuccess(videos),
)

export const getAllVideos = createSelector(
  selectChannel,
  state => merge(Object.keys(state.channels).map(key => Object.keys(state.channels[key].videos).map(key2 => state.channels[key].videos[key2]))),
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

export const getTitleWordWeights = createSelector(
  selectChannel,
  state => state.wordWeights,
)

export const getClickbaitObjectSuccess = createSelector(
  getAllVideos,
  state => calculateObjectSuccess(state),
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
    } else return EMPTY_VIDEO_STATISTIC
  },
)
