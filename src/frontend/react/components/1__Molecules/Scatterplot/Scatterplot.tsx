import React, { useMemo, useState } from 'react'
import { EMPTY_VIDEO, VideoInterface } from '../../../../../shared/Domain/Model/VideoInterface'
import { useSelector } from 'react-redux'
import { getFrom, getTo } from '../../../../store/ui/ui.selector'
import { scaleLinear, scaleTime, scalePow } from 'd3-scale'
import themeVariables from '../../../../styles/themeVariables'
import VideoCircle from './VideoCircle'
import numberFormatter from '../../../../util/NumberFormatter'
import { ScatterPlotSvg } from '../../2__Compounds/ScatterPlot/VideoScatterplotStyling'
import { path } from 'd3-path'
import { VideoBox } from './Styling'
import moment from 'moment'
import { useWindowWidth } from '../../../../util/Hooks'
import clampByLength from '../../../../util/ClampByLength'

interface ScatterplotProps {
  videos: VideoInterface[]
  filterGroup: string
  highlights: string[]
  scale: string
  zoom: [number, number]
}

const Scatterplot: React.FC<ScatterplotProps> = ({
  videos,
  filterGroup,
  highlights,
  scale,
  zoom,
}) => {
  const from = useSelector(getFrom)
  const to = useSelector(getTo)

  const windowWidth = useWindowWidth()
  const width = windowWidth > 1200 ? 800 : (windowWidth > 1000 ? 650 : (windowWidth > 600 ? 500 : (windowWidth > 500 ? 400 : 300)))
  const height = width * 0.75

  const spacingLeft = 30
  const spacingBottom = 20

  const [currentVideo, setCurrentVideo] = useState(EMPTY_VIDEO)
  const [hovered, setHovered] = useState(false)

  const y = useMemo(() => {
    if (scale === 'linear') {
      return scaleLinear().domain(zoom).range([height - spacingBottom, 0])
    } else {
      return scalePow().exponent(0.0005).domain(zoom).range([height - spacingBottom, 0])
    }
  }, [videos, zoom, scale, height])

  const yTicks = y.ticks()

  const x = useMemo(() => {
    return scaleTime().domain([from, to]).range([spacingLeft, width])
  }, [from, to, width])

  const xTicks = x.ticks(6)

  const axes = (context) => {
    context.moveTo(spacingLeft, 0)
    context.lineTo(spacingLeft, height - spacingBottom)
    context.lineTo(width, height - spacingBottom)

    yTicks.forEach(tick => {
      context.moveTo(spacingLeft - 5, y(tick))
      context.lineTo(spacingLeft, y(tick))
    })

    if (scale === 'pow') {
      context.moveTo(spacingLeft - 5, y(4))
      context.lineTo(spacingLeft, y(4))
    }

    xTicks.forEach(tick => {
      context.moveTo(x(tick), height - spacingBottom)
      context.lineTo(x(tick), height - spacingBottom + 5)
    })

    return context
  }

  const grid = (context) => {
    yTicks.forEach(tick => {
      context.moveTo(spacingLeft, y(tick))
      context.lineTo(width, y(tick))
    })

    xTicks.forEach(tick => {
      context.moveTo(x(tick), 0)
      context.lineTo(x(tick), height - spacingBottom)
    })

    return context
  }

  return (
    <ScatterPlotSvg viewBox={'0 0 ' + width + ' ' + height}>
      <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='shadow'>
        <feOffset dx='0' dy='4' in='SourceAlpha' result='shadowOffsetOuter1' />
        <feGaussianBlur stdDeviation='10' in='shadowOffsetOuter1' result='shadowBlurOuter1' />
        <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' in='shadowBlurOuter1' type='matrix' result='shadowMatrixOuter1' />
        <feMerge>
          <feMergeNode in='shadowMatrixOuter1' />
          <feMergeNode in='SourceGraphic' />
        </feMerge>
      </filter>
      <path d={grid(path())} stroke={themeVariables.colorLightGrey} fill='none' />
      {
        videos.map((video, index) => {
          return (
            <g
              key={index}
              transform={`translate(${x(new Date(video.upload_time))},${y(video.statistics[0].success_factor)})`}
              onMouseEnter={() => {
                setHovered(true)
                setCurrentVideo(video)
              }}
              onMouseLeave={() => {
                setHovered(false)
              }}
            >
              <VideoCircle
                video={video}
                filterGroup={filterGroup}
                highlights={highlights}
              />
            </g>
          )
        })
      }
      <rect x={0} y={0} width={spacingLeft} height={height} fill={themeVariables.colorWhite} />
      <rect x={0} y={height - spacingBottom} width={width} height={spacingBottom} fill={themeVariables.colorWhite} />
      {
        yTicks.map((tick, index) => {
          return <text key={index} x={spacingLeft - 10} y={y(tick) + 4} textAnchor='end' fontSize={12} fill={themeVariables.colorDarkGrey}>{numberFormatter(tick, 0)}</text>
        })
      }
      {
        xTicks.map((tick, index) => {
          return <text key={index} x={x(tick)} y={height - spacingBottom + 16} textAnchor='middle' fontSize={12} fill={themeVariables.colorDarkGrey}>{moment(tick).format('DD.MM')}</text>
        })
      }
      {scale === 'pow' && <text x={spacingLeft - 10} y={y(4) + 4} textAnchor='end' fontSize={12} fill={themeVariables.colorDarkGrey}>4</text>}
      <text x={5} y={-spacingLeft - 7} textAnchor='start' fontSize={12} fill={themeVariables.colorDarkGrey} transform='rotate(90)'>Erfolgswert</text>
      <text x={width - 5} y={height - spacingBottom - 5} textAnchor='end' fontSize={12} fill={themeVariables.colorDarkGrey}>Uploaddatum</text>
      <path d={axes(path())} stroke={themeVariables.colorDarkGrey} fill='none' />
      <VideoBox hovered={hovered} transform={`translate(${x(new Date(currentVideo.upload_time)) < 600 ? x(new Date(currentVideo.upload_time)) : x(new Date(currentVideo.upload_time)) - 180},${y(currentVideo.statistics[0].success_factor) < 480 ? y(currentVideo.statistics[0].success_factor) : y(currentVideo.statistics[0].success_factor) - 110})`}>
        <rect x={5} y={5} width={170} height={112} fill={themeVariables.colorWhite} filter='url(#shadow)' />
        <image x={10} y={10} href={currentVideo.statistics[0].video_thumbnail.thumbnail} width={160} height={90} />
        <text x={10} y={112} fontSize={12} fill={themeVariables.colorDarkGrey}>{clampByLength(currentVideo.statistics[0].video_meta.title, 20)}</text>
      </VideoBox>
    </ScatterPlotSvg>
  )
}

export default Scatterplot
