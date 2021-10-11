export class VideoStatistic {
  videoStatisticId?: number
  videoId: string
  views?: number
  title?: string
  thumbnail?: string
  description?: string
  tags?: string
  likes?: number
  dislikes?: number
  favouriteCount?: number
  commentCount?: number

  constructor (
    videoId: string,
    views?: number,
    title?: string,
    thumbnail?: string,
    description?: string,
    tags?: string,
    likes?: number,
    dislikes?: number,
    favouriteCount?: number,
    commentCount?: number,
    videoStatisticId?: number,
  ) {
    this.videoStatisticId = videoStatisticId
    this.videoId = videoId
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
