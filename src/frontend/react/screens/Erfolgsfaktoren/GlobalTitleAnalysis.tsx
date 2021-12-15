import React from 'react'
import TitleAnalysis from '../../components/TitleAnalysis/TitleAnalysis'
import { useSelector } from 'react-redux'
import { getAmountOfVideos, getTitleSuccess } from '../../../store/channel/channel.selector'
import { max, merge } from 'd3-array'

const GlobalTitleAnalysis: React.FC = () => {
  const amountOfVideos = useSelector(getAmountOfVideos)
  const titleSuccess = useSelector(getTitleSuccess)
  const maxAmount = max(merge(Object.keys(titleSuccess).map(key => Object.keys(titleSuccess[key]).map(key2 => titleSuccess[key][key2].amount))))
  const maxSuccess = max(merge(Object.keys(titleSuccess).map(key => Object.keys(titleSuccess[key]).map(key2 => titleSuccess[key][key2].meanSuccessFactor))))

  return (
    <TitleAnalysis
      amountOfVideos={amountOfVideos}
      titleSuccess={titleSuccess}
      maxAmount={maxAmount}
      maxSuccess={maxSuccess}
    />
  )
}

export default GlobalTitleAnalysis
