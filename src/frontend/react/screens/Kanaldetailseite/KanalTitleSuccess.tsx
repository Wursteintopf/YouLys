import React from 'react'
import { useSelector } from 'react-redux'
import {
  getCurrentChannel,
  getCurrentChannelTitleSuccess,
} from '../../../store/channel/channel.selector'
import { max, merge } from 'd3-array'
import TitleAnalysis from '../../components/TitleAnalysis/TitleAnalysis'

const KanalTitleSuccess: React.FC = () => {
  const currentChannel = useSelector(getCurrentChannel)
  const titleSuccess = useSelector(getCurrentChannelTitleSuccess)
  const maxAmount = max(merge(Object.keys(titleSuccess).map(key => Object.keys(titleSuccess[key]).map(key2 => titleSuccess[key][key2].amount))))
  const maxSuccess = max(merge(Object.keys(titleSuccess).map(key => Object.keys(titleSuccess[key]).map(key2 => titleSuccess[key][key2].meanSuccessFactor))))

  return (
    <TitleAnalysis
      amountOfVideos={currentChannel.videos.length}
      titleSuccess={titleSuccess}
      maxAmount={maxAmount}
      maxSuccess={maxSuccess}
    />
  )
}

export default KanalTitleSuccess
