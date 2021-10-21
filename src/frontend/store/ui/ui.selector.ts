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
