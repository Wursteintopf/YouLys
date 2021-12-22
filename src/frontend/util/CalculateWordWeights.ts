import { VideoInterface } from '../../shared/Domain/Model/VideoInterface'

interface WordWeight {
  value: string
  count: number
}

export const calculateWordWeights = (videos: VideoInterface[]): WordWeight[] => {
  let weights: WordWeight[] = []

  videos.forEach(video => {
    const words = video.statistics[0].video_meta.title.split(/[ /]/)
    words.filter(w => w.length > 2).forEach(word => {
      word = word.replace(/[^\wäöüß\s]/gi, '')
      const weight = weights.find(w => w.value === word) || { value: word, count: 0 }
      weights = weights.filter(w => w.value !== word)
      weight.count += 1
      weights.push(weight)
    })
  })

  return weights.filter(w => w.count > 20)
}
