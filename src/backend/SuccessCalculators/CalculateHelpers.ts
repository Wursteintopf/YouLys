import { Video } from '../Domain/Model/Video'
import { Result } from '../../shared/Domain/Model/ChannelSuccessResultsInterface'
import { mean } from 'mathjs'

const calculateMean = (array: number[]) => {
  if (array.length > 0) return mean(array)
  else return null
}

const calculateMeanSuccessFromVideoArray = (array: Video[]) => {
  return calculateMean(array.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor))
}

export const calculateResultFromVideoArray = (array: Video[]): Result => {
  return {
    amount: array.length,
    meanSuccessFactor: calculateMeanSuccessFromVideoArray(array),
  }
}
