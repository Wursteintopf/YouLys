import { TimeRange } from '../../../shared/Enums/TimeRange'

export interface uiState {
  range: TimeRange
  from: Date
  to: Date
  fetching: boolean
  channelsFetched: boolean
}
