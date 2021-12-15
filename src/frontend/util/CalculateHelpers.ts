import { mean } from 'mathjs'
import { VideoInterface } from '../../shared/Domain/Model/VideoInterface'

export interface Result {
  amount: number
  meanSuccessFactor?: number
}

export const EMPTY_RESULT: Result = {
  amount: 0,
  meanSuccessFactor: undefined,
}

const calculateMean = (array: number[]) => {
  if (array.length > 0) return mean(array)
  else return null
}

const calculateMeanSuccessFromVideoArray = (array: VideoInterface[]) => {
  return calculateMean(array.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor))
}

export const calculateResultFromVideoArray = (array: VideoInterface[]): Result => {
  return {
    amount: array.length,
    meanSuccessFactor: calculateMeanSuccessFromVideoArray(array),
  }
}
