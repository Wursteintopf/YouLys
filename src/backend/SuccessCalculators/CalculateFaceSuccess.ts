import { Video } from '../Domain/Model/Video'
import { FaceSuccessResultsInterface, Result } from '../../shared/Domain/Model/ChannelSuccessResultsInterface'
import { calculateResultFromVideoArray } from './CalculateHelpers'

export const calculateFaceSuccess = (videos: Video[]): FaceSuccessResultsInterface => {
  return {
    existence: {
      yes: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.length > 0)),
      no: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.length === 0)),
    },
    amount: {
      one: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.length === 1)),
      two: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.length === 2)),
      more: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.length > 2)),
    },
    expression: {
      angry: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.expression).includes('angry'))),
      happy: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.expression).includes('sad'))),
      neutral: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.expression).includes('surprised'))),
      sad: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.expression).includes('happy'))),
      surprised: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.expression).includes('neutral'))),
    },
    gender: {
      female: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.gender).includes('female'))),
      male: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.gender).includes('male'))),
    },
    size: {
      big: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.width * f.height > 100000).includes(true))),
      small: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.width * f.height < 100000).includes(true))),
    },
  }
}
