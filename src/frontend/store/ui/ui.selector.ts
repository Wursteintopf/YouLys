import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'

const selectUi = (state: RootState) => state.ui

export const getRange = createSelector(
  selectUi,
  state => state.range,
)

export const getFrom = createSelector(
  selectUi,
  state => state.from,
)

export const getTo = createSelector(
  selectUi,
  state => state.to,
)

export const getFetching = createSelector(
  selectUi,
  state => state.fetching,
)

export const getChannelsFetched = createSelector(
  selectUi,
  state => state.channelsFetched,
)

export const getVideosFetched = createSelector(
  selectUi,
  state => state.videosFetched,
)

export const getChannelStatsFetched = createSelector(
  selectUi,
  state => state.channelStatsFetched,
)

export const getVideoStatsFetched = createSelector(
  selectUi,
  state => state.videoStatsFetched,
)
