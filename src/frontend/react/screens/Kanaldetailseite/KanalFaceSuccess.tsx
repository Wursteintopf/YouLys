import React from 'react'
import FacesOnThumbnails from '../../components/FacesOnThumbnails/FacesOnThumbnails'
import { useSelector } from 'react-redux'
import { getCurrentChannel, getCurrentChannelFaceSuccess } from '../../../store/channel/channel.selector'
import { max, merge } from 'd3-array'

const KanalFaceSuccess: React.FC = () => {
  const currentChannel = useSelector(getCurrentChannel)
  const faceSuccess = useSelector(getCurrentChannelFaceSuccess)
  const maxAmount = max(merge(Object.keys(faceSuccess).map(key => Object.keys(faceSuccess[key]).map(key2 => faceSuccess[key][key2].amount))))
  const maxSuccess = max(merge(Object.keys(faceSuccess).map(key => Object.keys(faceSuccess[key]).map(key2 => faceSuccess[key][key2].meanSuccessFactor))))

  return (
    <FacesOnThumbnails
      amountOfVideos={currentChannel.videos.length}
      faceSuccess={faceSuccess}
      maxAmount={maxAmount}
      maxSuccess={maxSuccess}
    />
  )
}

export default KanalFaceSuccess
