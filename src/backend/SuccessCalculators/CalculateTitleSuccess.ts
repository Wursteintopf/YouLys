import { Video } from '../Domain/Model/Video'
import { TitleSuccessResultsInterface } from '../../shared/Domain/Model/ChannelSuccessResultsInterface'
import { calculateResultFromVideoArray } from './CalculateHelpers'
import {
  checkStringForEmoji,
  checkStringForPunctuation,
  checkStringForUppercase,
} from '../../shared/Utils/checkStrings'

export const calculateTitleSuccess = (videos: Video[]): TitleSuccessResultsInterface => {
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
