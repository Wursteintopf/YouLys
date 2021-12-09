import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'
import { max, merge } from 'd3-array'

const selectSuccess = (state: RootState) => state.success

export const getSuccess = createSelector(
  selectSuccess,
  state => state.success,
)

export const getFaceSuccess = createSelector(
  selectSuccess,
  state => state.success.faces,
)

export const getFaceMaxSuccess = createSelector(
  getFaceSuccess,
  state => {
    return max(merge(Object.keys(state).map(key => Object.keys(state[key]).map(key2 => state[key][key2].meanSuccessFactor))))
  },
)

export const getFaceMaxAmount = createSelector(
  getFaceSuccess,
  state => {
    return max(merge(Object.keys(state).map(key => Object.keys(state[key]).map(key2 => state[key][key2].amount))))
  },
)
