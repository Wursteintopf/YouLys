import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'
import { max, merge } from 'd3-array'

const selectSuccess = (state: RootState) => state.success

export const getSuccess = createSelector(
  selectSuccess,
  state => state.success,
)

export const getFaceMaxSuccess = createSelector(
  selectSuccess,
  state => {
    const faces = state.success.faces
    return max(merge(Object.keys(faces).map(key => Object.keys(faces[key]).map(key2 => faces[key][key2].meanSuccessFactor))))
  },
)

export const getFaceMaxAmount = createSelector(
  selectSuccess,
  state => {
    const faces = state.success.faces
    return max(merge(Object.keys(faces).map(key => Object.keys(faces[key]).map(key2 => faces[key][key2].amount))))
  },
)

export const getTitleMaxSuccess = createSelector(
  selectSuccess,
  state => {
    const faces = state.success.title
    return max(merge(Object.keys(faces).map(key => Object.keys(faces[key]).map(key2 => faces[key][key2].meanSuccessFactor))))
  },
)

export const getTitleMaxAmount = createSelector(
  selectSuccess,
  state => {
    const faces = state.success.title
    return max(merge(Object.keys(faces).map(key => Object.keys(faces[key]).map(key2 => faces[key][key2].amount))))
  },
)
