import React from 'react'
import { VideoInterface } from '../../../../../shared/Domain/Model/VideoInterface'
import themeVariables from '../../../../styles/themeVariables'
import { FaceInterface } from '../../../../../shared/Domain/Model/FaceInterface'
import { isBigFace } from '../../../../util/CalculateFaceSuccess'
import { StyledVideoCircle } from './Styling'
import { useHistory } from 'react-router'
import {
  checkStringForEmoji,
  checkStringForPunctuation,
  checkStringForUppercase,
} from '../../../../../shared/Utils/checkStrings'
import { ClickbaitObjectInterface } from '../../../../../shared/Domain/Model/ClickbaitObjectInterface'

interface VideoCircleProps {
  video: VideoInterface
  filterGroup: string
  highlights: string[]
}

const VideoCircle: React.FC<VideoCircleProps> = ({ video, filterGroup, highlights }) => {
  const history = useHistory()

  const getColor = (face?: FaceInterface, clickbaitObject?: ClickbaitObjectInterface) => {
    if (filterGroup === 'amount') {
      switch (video.statistics[0].video_thumbnail.faces.length) {
        case 0:
          return themeVariables.colorShades[0]
        case 1:
          return themeVariables.colorShades[2]
        case 2:
          return themeVariables.colorShades[4]
        default:
          return themeVariables.colorShades[6]
      }
    } else if (face && filterGroup === 'emotion') {
      switch (face.expression) {
        case 'angry':
          return themeVariables.colorShades[0]
        case 'fearful':
          return themeVariables.colorShades[1]
        case 'sad':
          return themeVariables.colorShades[2]
        case 'happy':
          return themeVariables.colorShades[3]
        case 'surprised':
          return themeVariables.colorShades[4]
        case 'disgusted':
          return themeVariables.colorShades[5]
        case 'neutral':
          return themeVariables.colorShades[6]
      }
    } else if (face && filterGroup === 'sex') {
      switch (face.gender) {
        case 'female':
          return themeVariables.colorShades[0]
        case 'male':
          return themeVariables.colorShades[2]
      }
    } else if (face && filterGroup === 'size') {
      if (isBigFace(face)) return themeVariables.colorShades[0]
      else return themeVariables.colorShades[2]
    } else if (filterGroup === 'uppercase') {
      if (checkStringForUppercase(video.statistics[0].video_meta.title)) return themeVariables.colorShades[0]
      else return themeVariables.colorShades[2]
    } else if (filterGroup === 'punctuation') {
      if (checkStringForPunctuation(video.statistics[0].video_meta.title)) return themeVariables.colorShades[0]
      else return themeVariables.colorShades[2]
    } else if (filterGroup === 'emoji') {
      if (checkStringForEmoji(video.statistics[0].video_meta.title)) return themeVariables.colorShades[0]
      else return themeVariables.colorShades[2]
    } else if (clickbaitObject && filterGroup === 'object') {
      if (clickbaitObject.type === 'circle') return themeVariables.colorShades[0]
      else if (clickbaitObject.type === 'arrow') return themeVariables.colorShades[2]
      else if (clickbaitObject.type === 'emoji') return themeVariables.colorShades[4]
    } else if (filterGroup === 'circle') {
      if (video.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('circle')) return themeVariables.colorShades[0]
      else return themeVariables.colorShades[2]
    } else if (filterGroup === 'arrow') {
      if (video.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('arrow')) return themeVariables.colorShades[0]
      else return themeVariables.colorShades[2]
    } else if (filterGroup === 'emojiThumb') {
      if (video.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('emoji')) return themeVariables.colorShades[0]
      else return themeVariables.colorShades[2]
    }
  }

  const getDisplayed = (face?: FaceInterface, clickbaitObject?: ClickbaitObjectInterface): boolean => {
    if (highlights.length === 0) return true
    else if (filterGroup === 'amount') {
      const amount = video.statistics[0].video_thumbnail.faces.length
      if (amount === 0 && highlights.includes('none')) return true
      else if (amount === 1 && highlights.includes('one')) return true
      else if (amount === 2 && highlights.includes('two')) return true
      else if (amount > 2 && highlights.includes('more')) return true
      else return false
    } else if (face && filterGroup === 'emotion') {
      if (highlights.includes(face.expression)) return true
      else return false
    } else if (face && filterGroup === 'sex') {
      if (highlights.includes(face.gender)) return true
      else return false
    } else if (face && filterGroup === 'size') {
      if (highlights.includes('big') && isBigFace(face)) return true
      if (highlights.includes('small') && !isBigFace(face)) return true
      else return false
    } else if (filterGroup === 'uppercase') {
      if (highlights.includes('caps') && checkStringForUppercase(video.statistics[0].video_meta.title)) return true
      else if (highlights.includes('noCaps') && !checkStringForUppercase(video.statistics[0].video_meta.title)) return true
      else return false
    } else if (filterGroup === 'punctuation') {
      if (highlights.includes('punc') && checkStringForPunctuation(video.statistics[0].video_meta.title)) return true
      else if (highlights.includes('noPunc') && !checkStringForPunctuation(video.statistics[0].video_meta.title)) return true
      else return false
    } else if (filterGroup === 'emoji') {
      if (highlights.includes('emoji') && checkStringForEmoji(video.statistics[0].video_meta.title)) return true
      else if (highlights.includes('noEmoji') && !checkStringForEmoji(video.statistics[0].video_meta.title)) return true
      else return false
    } else if (clickbaitObject && filterGroup === 'object') {
      if (highlights.includes('circleObject') && clickbaitObject.type === 'circle') return true
      else if (highlights.includes('arrowObject') && clickbaitObject.type === 'arrow') return true
      else if (highlights.includes('emojiObject') && clickbaitObject.type === 'emoji') return true
    } else if (filterGroup === 'circle') {
      if (highlights.includes('circle') && video.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('circle')) return true
      else if (highlights.includes('noCircle') && !video.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('circle')) return true
      else return false
    } else if (filterGroup === 'arrow') {
      if (highlights.includes('arrow') && video.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('arrow')) return true
      else if (highlights.includes('noArrow') && !video.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('arrow')) return true
      else return false
    } else if (filterGroup === 'emojiThumb') {
      if (highlights.includes('emojiThumb') && video.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('emoji')) return true
      else if (highlights.includes('noEmojiThumb') && !video.statistics[0].video_thumbnail.clickbait_objects.map(c => c.type).includes('emoji')) return true
      else return false
    }
    return false
  }

  const renderVideoOrFaces = () => {
    const circles = [] as any
    if (['emotion', 'sex', 'size'].includes(filterGroup)) {
      video.statistics[0].video_thumbnail.faces.forEach((face, index) => {
        if (getDisplayed(face)) circles.push(<circle key={index} cx={0} cy={0} r={5} fill={getColor(face)} fillOpacity={0.8} />)
      })
    } else if (filterGroup === 'object') {
      video.statistics[0].video_thumbnail.clickbait_objects.forEach((co, index) => {
        if (getDisplayed(undefined, co)) circles.push(<circle key={index} cx={0} cy={0} r={5} fill={getColor(undefined, co)} fillOpacity={0.8} />)
      })
    } else if (getDisplayed()) {
      circles.push(<circle key={video.video_id} cx={0} cy={0} r={5} fill={getColor()} fillOpacity={0.8} />)
    }
    return circles
  }

  if (renderVideoOrFaces().length === 0) return <></>

  return (
    <StyledVideoCircle onClick={() => history.push('/videodetails/' + video.channel_id + '/' + video.video_id)}>
      {renderVideoOrFaces()}
    </StyledVideoCircle>
  )
}

export default VideoCircle
