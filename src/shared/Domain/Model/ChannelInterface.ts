import { ChannelStatisticInterface } from './ChannelStatisticInterface'
import { VideoInterface } from './VideoInterface'

export interface AveragePerformanceInterface {
  views: {
    minimum: number
    lowerQuantile: number
    median: number
    upperQuantile: number
    maximum: number
  }
  commentCount: {
    minimum: number
    lowerQuantile: number
    median: number
    upperQuantile: number
    maximum: number
  }
  likePercentage: {
    minimum: number
    lowerQuantile: number
    median: number
    upperQuantile: number
    maximum: number
  }
}

export const EMPTY_AVERAGE_PERFORMANCE: AveragePerformanceInterface = {
  commentCount: {
    lowerQuantile: 0,
    maximum: 0,
    median: 0,
    minimum: 0,
    upperQuantile: 0,
  },
  likePercentage: {
    lowerQuantile: 0,
    maximum: 0,
    median: 0,
    minimum: 0,
    upperQuantile: 0,
  },
  views: {
    lowerQuantile: 0,
    maximum: 0,
    median: 0,
    minimum: 0,
    upperQuantile: 0,
  },
}

export interface ChannelInterface {
  channel_id: string
  created_at: Date
  statistics: ChannelStatisticInterface[]
  videos: VideoInterface[]
  tracked: boolean
  average_performance: AveragePerformanceInterface
}

export const EMPTY_CHANNEL: ChannelInterface = {
  channel_id: '',
  created_at: new Date(),
  statistics: [],
  videos: [],
  tracked: true,
  average_performance: EMPTY_AVERAGE_PERFORMANCE,
}
