import { VideoInterface } from '../../shared/Domain/Model/VideoInterface'
import { max, min, quantileSeq } from 'mathjs'

export interface PerformanceInterface {
  minimum: number
  lowerQuantile: number
  median: number
  upperQuantile: number
  maximum: number
}

export interface AveragePerformanceInterface {
  views: PerformanceInterface
  commentCount: PerformanceInterface
  likes: PerformanceInterface
}

export const calculateAveragePerformance = (videos: VideoInterface[]): AveragePerformanceInterface => {
  const views = videos.map(v => v.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0].views)
  const likes = videos.map(v => v.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0].likes)
  const commentCounts = videos.map(v => v.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0].commentCount)

  return {
    views: {
      minimum: min(views),
      lowerQuantile: quantileSeq(views, 0.25) as number,
      median: quantileSeq(views, 0.5) as number,
      upperQuantile: quantileSeq(views, 0.75) as number,
      maximum: max(views),
    },
    likes: {
      minimum: min(likes),
      lowerQuantile: quantileSeq(likes, 0.25) as number,
      median: quantileSeq(likes, 0.5) as number,
      upperQuantile: quantileSeq(likes, 0.75) as number,
      maximum: max(likes),
    },
    commentCount: {
      minimum: min(commentCounts),
      lowerQuantile: quantileSeq(commentCounts, 0.25) as number,
      median: quantileSeq(commentCounts, 0.5) as number,
      upperQuantile: quantileSeq(commentCounts, 0.75) as number,
      maximum: max(commentCounts),
    },
  }
}
