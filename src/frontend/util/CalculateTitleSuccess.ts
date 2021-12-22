import {
  calculateMeanAndMax,
  calculateResultFromVideoArray,
  EMPTY_RESULT,
  EMPTY_SUCCESS_RESULT,
  Result,
  SuccessResults,
} from './CalculateHelpers'
import {
  checkStringForEmoji,
  checkStringForPunctuation,
  checkStringForUppercase,
} from '../../shared/Utils/checkStrings'
import { VideoInterface } from '../../shared/Domain/Model/VideoInterface'
import { min, max } from 'd3-array'

export interface TitleSuccessResultsInterface extends SuccessResults {
  uppercase: {
    yes: Result
    no: Result
  }
  punctuation: {
    yes: Result
    no: Result
  }
  emoji: {
    yes: Result
    no: Result
  }
}

export const EMPTY_TITLE_SUCCESS_RESULT: TitleSuccessResultsInterface = {
  ...EMPTY_SUCCESS_RESULT,
  uppercase: {
    yes: EMPTY_RESULT,
    no: EMPTY_RESULT,
  },
  punctuation: {
    yes: EMPTY_RESULT,
    no: EMPTY_RESULT,
  },
  emoji: {
    yes: EMPTY_RESULT,
    no: EMPTY_RESULT,
  },
}

export const calculateTitleSuccess = (videos: VideoInterface[]): TitleSuccessResultsInterface => {
  if (videos.length === 0) return EMPTY_TITLE_SUCCESS_RESULT

  const result = {
    count: videos.length,
    minSuccess: min(videos.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor)),
    maxSuccess: max(videos.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor)),
    uppercase: {
      yes: calculateResultFromVideoArray(videos.filter(v => checkStringForUppercase(v.statistics[0].video_meta.title))),
      no: calculateResultFromVideoArray(videos.filter(v => !checkStringForUppercase(v.statistics[0].video_meta.title))),
    },
    punctuation: {
      yes: calculateResultFromVideoArray(videos.filter(v => checkStringForPunctuation(v.statistics[0].video_meta.title))),
      no: calculateResultFromVideoArray(videos.filter(v => !checkStringForPunctuation(v.statistics[0].video_meta.title))),
    },
    emoji: {
      yes: calculateResultFromVideoArray(videos.filter(v => checkStringForEmoji(v.statistics[0].video_meta.title))),
      no: calculateResultFromVideoArray(videos.filter(v => !checkStringForEmoji(v.statistics[0].video_meta.title))),
    },
  }

  return calculateMeanAndMax(result)
}
