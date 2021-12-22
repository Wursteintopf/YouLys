import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentChannelTitleWordWeights, getTitleWordWeights } from '../../../../store/channel/channel.selector'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'
import { TagCloud } from 'react-tagcloud'

interface WordCloudProps {
  global?: boolean
}

const WordCloud: React.FC<WordCloudProps> = ({ global }) => {
  const words = global ? useSelector(getTitleWordWeights) : useSelector(getCurrentChannelTitleWordWeights)
  const fetching = useSelector(getFetching)

  if (fetching) return <Progress />

  const options = {
    luminosity: 'dark',
    hue: 'blue',
  }

  return (
    <TagCloud
      minSize={16}
      maxSize={60}
      tags={words}
      colorOptions={options}
    />
  )
}

export default WordCloud
