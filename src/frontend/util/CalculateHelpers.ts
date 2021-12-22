import { mean, max, min, quantileSeq } from 'mathjs'
import { VideoInterface } from '../../shared/Domain/Model/VideoInterface'
import { merge } from 'd3-array'

export interface SuccessResults {
  count: number
  maxAmount: number
  maxMeanSuccess: number
  minSuccess: number
  maxSuccess: number
}

export const EMPTY_SUCCESS_RESULT: SuccessResults = {
  count: 0,
  maxAmount: 0,
  maxMeanSuccess: 0,
  minSuccess: 0,
  maxSuccess: 0,
}

export interface Result {
  amount: number
  meanSuccessFactor: number
  minimum: number
  lowerQuantile: number
  median: number
  upperQuantile: number
  maximum: number
}

export const EMPTY_RESULT: Result = {
  amount: 0,
  meanSuccessFactor: 0,
  minimum: 0,
  lowerQuantile: 0,
  median: 0,
  upperQuantile: 0,
  maximum: 0,
}

const calculateMean = (array: number[]) => {
  if (array.length > 0) return mean(array)
  else return null
}

const extractSuccessFactors = (array: VideoInterface[]) => {
  return array.filter(v => v.statistics[0].success_factor).map(v => v.statistics[0].success_factor)
}

export const calculateResultFromVideoArray = (array: VideoInterface[]): Result => {
  const factors = extractSuccessFactors(array)

  if (factors.length === 0) return EMPTY_RESULT

  return {
    amount: array.length,
    meanSuccessFactor: calculateMean(factors),
    minimum: min(factors),
    lowerQuantile: quantileSeq(factors, 0.25) as number,
    median: quantileSeq(factors, 0.5) as number,
    upperQuantile: quantileSeq(factors, 0.75) as number,
    maximum: max(factors),
  }
}

export const calculateMeanAndMax = (result) => {
  return {
    maxAmount: max(merge(Object.keys(result).map(key => Object.keys(result[key]).map(key2 => result[key][key2].amount)))),
    maxMeanSuccess: max(merge(Object.keys(result).map(key => Object.keys(result[key]).map(key2 => result[key][key2].meanSuccessFactor)))),
    ...result,
  }
}
