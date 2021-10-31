import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'
import { EMPTY_VIDEO_STATISTIC } from '../../../shared/Domain/Model/VideoStatisticInterface'
import { EMPTY_CHANNEL_STATISTIC } from '../../../shared/Domain/Model/ChannelStatisticInterface'

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
