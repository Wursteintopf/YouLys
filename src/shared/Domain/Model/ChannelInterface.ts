import { ChannelStatisticInterface } from './ChannelStatisticInterface'
import { VideoInterface } from './VideoInterface'
import { ChannelAveragePerformanceInterface, EMPTY_CHANNEL_AVERAGE_PERFORMANCE } from './ChannelAveragePerformanceInterface'
import { SuccessResultsInterface, EMPTY_SUCCESS_RESULT } from './ChannelSuccessResultsInterface'

export interface ChannelInterface {
  channel_id: string
  created_at: Date
  statistics: ChannelStatisticInterface[]
  videos: VideoInterface[]
  tracked: boolean
  average_performance: ChannelAveragePerformanceInterface
  success_results: SuccessResultsInterface
}

export const EMPTY_CHANNEL: ChannelInterface = {
  channel_id: '',
  created_at: new Date(),
  statistics: [],
  videos: [],
  tracked: true,
  average_performance: EMPTY_CHANNEL_AVERAGE_PERFORMANCE,
  success_results: EMPTY_SUCCESS_RESULT,
}
