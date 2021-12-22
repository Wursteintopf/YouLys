import { TimeRange } from '../../../shared/Enums/TimeRange'
import { ApiStatusCodes } from '../../../shared/Enums/ApiStatusCodes'

export interface uiState {
  range: TimeRange
  from: Date
  to: Date
  fetching: boolean
  isFetchingChannelStats: boolean
  channelsFetched: boolean
  videosFetched: boolean
  channelStatsFetched: string[]
  videoStatsFetched: string[]
  error?: ApiStatusCodes
}
