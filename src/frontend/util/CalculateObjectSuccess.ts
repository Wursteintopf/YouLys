import {
  calculateMeanAndMax,
  calculateResultFromVideoArray,
  EMPTY_RESULT,
  EMPTY_SUCCESS_RESULT,
  Result,
  SuccessResults,
} from './CalculateHelpers'
import { VideoInterface } from '../../shared/Domain/Model/VideoInterface'
import { min, max } from 'd3-array'

export interface ObjectSuccessResultsInterface extends SuccessResults {
  circle: {
    yes: Result
    no: Result
  }
  arrow: {
    yes: Result
    no: Result
  }
  emojiThumb: {
    yes: Result
    no: Result
  }
}

export const EMPTY_OBJECT_SUCCESS_RESULT: ObjectSuccessResultsInterface = {
  ...EMPTY_SUCCESS_RESULT,
  circle: {
    yes: EMPTY_RESULT,
    no: EMPTY_RESULT,
  },
  arrow: {
    yes: EMPTY_RESULT,
    no: EMPTY_RESULT,
  },
  emojiThumb: {
    yes: EMPTY_RESULT,
    no: EMPTY_RESULT,
  },
}

export const calculateObjectSuccess = (videos: VideoInterface[]): ObjectSuccessResultsInterface => {
  if (videos.length === 0) return EMPTY_OBJECT_SUCCESS_RESULT

  const result = {
    count: videos.length,
    minSuccess: min(videos.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor)),
    maxSuccess: max(videos.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor)),
    circle: {
      yes: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('circle'))),
      no: calculateResultFromVideoArray(videos.filter(v => !v.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('circle'))),
    },
    arrow: {
      yes: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('arrow'))),
      no: calculateResultFromVideoArray(videos.filter(v => !v.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('arrow'))),
    },
    emojiThumb: {
      yes: calculateResultFromVideoArray(videos.filter(v => v.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('emoji'))),
      no: calculateResultFromVideoArray(videos.filter(v => !v.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('emoji'))),
    },
  }

  return calculateMeanAndMax(result)
}
