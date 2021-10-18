import React, { useMemo } from 'react'
import bezierSpline from '@freder/bezier-spline'
import { scaleLinear, scaleTime } from 'd3-scale'
import { path } from 'd3-path'
import { min, max } from 'd3-array'
import themeVariables from '../../../styles/themeVariables'
import { useSelector } from 'react-redux'
import { getFrom, getTo } from '../../../store/ui/ui.selector'
import numberFormatter from '../../../util/numberFormatter'

interface LineChartProps {
  values: number[]
  timeValues: Date[]
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const from = useSelector(getFrom)
  const to = useSelector(getTo)

  const height = 300
  const width = 548

  const spacingLeft = 55
  const spacingBottom = 20

  console.log(props.values)

  const y = useMemo(() => {
    return scaleLinear().domain([min(props.values), max(props.values)]).range([height - spacingBottom, 10])
  }, [props])

  const x = useMemo(() => {
    return scaleTime().domain([from, to]).range([0 + spacingLeft, width])
  }, [props])

  const yTicks = y.ticks(3)
  const xTicks = x.ticks(5)

  const points = props.values.map((value, index) => [x(props.timeValues[index]), y(value)])
  const controlPoints = bezierSpline.getControlPoints(points)
  const combined = bezierSpline.combinePoints(points, controlPoints)
  const segments = bezierSpline.getSegments(combined)

  const area = (context) => {
    segments.forEach((segment, index) => {
      if (index === 0) context.moveTo(segment[0][0], segment[0][1])
      context.bezierCurveTo(segment[1][0], segment[1][1], segment[2][0], segment[2][1], segment[3][0], segment[3][1])
    })
    context.lineTo(width, height - spacingBottom)
    context.lineTo(segments[0][0][0], height - spacingBottom)
    return context
  }

  const grid = (context) => {
    xTicks.forEach((tick) => {
      context.moveTo(x(tick), 0)
      context.lineTo(x(tick), height - spacingBottom)
    })

    yTicks.forEach((tick) => {
      context.moveTo(spacingLeft, y(tick))
      context.lineTo(width, y(tick))
    })
    return context
  }

  const axes = (context) => {
    context.moveTo(spacingLeft, 0)
    context.lineTo(spacingLeft, height - spacingBottom)
    context.lineTo(width, height - spacingBottom)

    xTicks.forEach((tick) => {
      context.moveTo(x(tick), height - spacingBottom)
      context.lineTo(x(tick), height - spacingBottom + 7)
    })

    yTicks.forEach((tick) => {
      context.moveTo(spacingLeft, y(tick))
      context.lineTo(spacingLeft - 7, y(tick))
    })

    return context
  }

  return (
    <svg width={width} height={height}>
      <path d={grid(path())} stroke={themeVariables.colorLightGrey} fill='none' />
      <path d={area(path())} stroke={themeVariables.colorBlue} fill={themeVariables.colorBlue} fillOpacity={0.1} />
      <rect x={0} y={height - spacingBottom} width={width} height={spacingBottom} fill='white' />
      <rect x={0} y={0} width={spacingLeft} height={height} fill='white' />
      <path d={axes(path())} stroke={themeVariables.colorDarkGrey} fill='none' />
      {
        yTicks.map((tick) => {
          return (
            <text key={tick} transform={`translate(45,${y(tick)})`} textAnchor='end' fill={themeVariables.colorDarkGrey} fontSize={themeVariables.fontSizeSmall}>{numberFormatter(tick)}</text>
          )
        })
      }
    </svg>
  )
}

export default LineChart
