export interface PerformanceInterface {
  minimum: number
  lowerQuantile: number
  median: number
  upperQuantile: number
  maximum: number
}

export interface ChannelAveragePerformanceInterface {
  views: PerformanceInterface
  commentCount: PerformanceInterface
  likes: PerformanceInterface
}

export const EMPTY_CHANNEL_AVERAGE_PERFORMANCE: ChannelAveragePerformanceInterface = {
  commentCount: {
    lowerQuantile: 0,
    maximum: 0,
    median: 0,
    minimum: 0,
    upperQuantile: 0,
  },
  likes: {
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
