export interface VideoApiPlaylistResult {
  snippet: {
    publishedAt: string
    resourceId: {
      videoId: string
    }
  }
}

export interface VideoApiResult {
  id: string
  snippet: {
    title: string
    description: string
    tags?: string[]
    thumbnails: {
      maxres?: {
        url: string
      }
      standard?: {
        url: string
      }
      high: {
        url: string
      }
    }
  }
  statistics: {
    viewCount: number
    likeCount: number
    dislikeCount: number
    favouriteCount: number
    commentCount: number
  }
  contentDetails: {
    duration: string
  }
}
