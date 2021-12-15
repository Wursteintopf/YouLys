import React from 'react'
import { useSelector } from 'react-redux'
import { getAmountOfVideos, getFaceSuccess } from '../../../store/channel/channel.selector'
import FacesOnThumbnails from '../../components/FacesOnThumbnails/FacesOnThumbnails'
import { max, merge } from 'd3-array'

const GlobalFacesOnThumbnails: React.FC = () => {
  const amountOfVideos = useSelector(getAmountOfVideos)
  const faceSuccess = useSelector(getFaceSuccess)
  const maxAmount = max(merge(Object.keys(faceSuccess).map(key => Object.keys(faceSuccess[key]).map(key2 => faceSuccess[key][key2].amount))))
  const maxSuccess = max(merge(Object.keys(faceSuccess).map(key => Object.keys(faceSuccess[key]).map(key2 => faceSuccess[key][key2].meanSuccessFactor))))

  return (
    <FacesOnThumbnails
      amountOfVideos={amountOfVideos}
      faceSuccess={faceSuccess}
      maxAmount={maxAmount}
      maxSuccess={maxSuccess}
    />
  )
}

export default GlobalFacesOnThumbnails
