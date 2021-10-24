export interface ChannelApiResult {
  id: string
  snippet: {
    title: string
    description: string
    publishedAt: string
    thumbnails: {
      high: {
        url: string
      }
    }
  }
  statistics: {
    subscriberCount: number
    hiddenSubscriberCount: boolean
    viewCount: number
    videoCount: number
  }
  brandingSettings: {
    channel: {
      unsubscribedTrailer: string
      keywords: string
    }
  }
}
