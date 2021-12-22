import {
  calculateMeanAndMax,
  calculateResultFromVideoArray,
  EMPTY_RESULT,
  EMPTY_SUCCESS_RESULT,
  Result,
  SuccessResults,
} from './CalculateHelpers'
import { VideoInterface } from '../../shared/Domain/Model/VideoInterface'
import { FaceInterface } from '../../shared/Domain/Model/FaceInterface'
import { min, max } from 'd3-array'

export interface FaceSuccessResultsInterface extends SuccessResults {
  existence: {
    yes: Result
    no: Result
  }
  amount: {
    one: Result
    two: Result
    more: Result
  }
  expression: {
    angry: Result
    sad: Result
    surprised: Result
    happy: Result
    neutral: Result
    fearful: Result
    disgusted: Result
  }
  gender: {
    male: Result
    female: Result
  }
  size: {
    small: Result
    big: Result
  }
}

export const EMPTY_FACE_SUCCESS_RESULT: FaceSuccessResultsInterface = {
  ...EMPTY_SUCCESS_RESULT,
  existence: {
    no: EMPTY_RESULT,
    yes: EMPTY_RESULT,
  },
  amount: {
    one: EMPTY_RESULT,
    two: EMPTY_RESULT,
    more: EMPTY_RESULT,
  },
  expression: {
    angry: EMPTY_RESULT,
    happy: EMPTY_RESULT,
    neutral: EMPTY_RESULT,
    sad: EMPTY_RESULT,
    surprised: EMPTY_RESULT,
    fearful: EMPTY_RESULT,
    disgusted: EMPTY_RESULT,
  },
  gender: {
    female: EMPTY_RESULT,
    male: EMPTY_RESULT,
  },
  size: {
    big: EMPTY_RESULT,
    small: EMPTY_RESULT,
  },
}

export const isBigFace = (face: FaceInterface) => {
  return face.width * face.height > 120000
}

export const calculateFaceSuccess = (videos: VideoInterface[]): FaceSuccessResultsInterface => {
  if (videos.length === 0) return EMPTY_FACE_SUCCESS_RESULT

  const result = {
    count: videos.length,
    minSuccess: min(videos.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor)),
    maxSuccess: max(videos.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor)),
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
      fearful: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.expression).includes('fearful'))),
      disgusted: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.expression).includes('disgusted'))),
    },
    gender: {
      female: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.gender).includes('female'))),
      male: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => f.gender).includes('male'))),
    },
    size: {
      big: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => isBigFace(f)).includes(true))),
      small: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.faces.map(f => !isBigFace(f)).includes(true))),
    },
  }

  return calculateMeanAndMax(result)
}
