export interface VideoStatisticInterface {
  video_statistic_id?: number
  video_id: string
  views?: number
  title?: string
  thumbnail?: string
  description?: string
  tags?: string
  likes?: number
  dislikes?: number
  favouriteCount?: number
  commentCount?: number
  timestamp?: Date
}
