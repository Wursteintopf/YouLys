export class VideoStatistic {
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

  constructor(
    video_id: string,
    views?: number,
    title?: string,
    thumbnail?: string,
    description?: string,
    tags?: string,
    likes?: number,
    dislikes?: number,
    favouriteCount?: number,
    commentCount?: number,
    video_statistic_id?: number
  ) {
    this.video_statistic_id = video_statistic_id
    this.video_id = video_id
    this.views = views
    this.title = title
    this.thumbnail = thumbnail
    this.description = description
    this.tags = tags
    this.likes = likes
    this.dislikes = dislikes
    this.favouriteCount = favouriteCount
    this.commentCount = commentCount
  }
}
