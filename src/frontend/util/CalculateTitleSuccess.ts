import { calculateResultFromVideoArray, EMPTY_RESULT, Result } from './CalculateHelpers'
import {
  checkStringForEmoji,
  checkStringForPunctuation,
  checkStringForUppercase,
} from '../../shared/Utils/checkStrings'
import { VideoInterface } from '../../shared/Domain/Model/VideoInterface'

export interface TitleSuccessResultsInterface {
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

  return {
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
}
