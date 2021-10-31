import React, { useMemo } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { path } from 'd3-path'
import { min, max } from 'd3-array'
import themeVariables from '../../../styles/themeVariables'
import { useSelector } from 'react-redux'
import { getFrom, getTo } from '../../../store/ui/ui.selector'
import numberFormatter from '../../../util/numberFormatter'
import moment from 'moment'

interface LineChartProps {
  values: {
    value: number
    timestamp: Date
  }[]
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const from = useSelector(getFrom)
  const to = useSelector(getTo)

  const sorted = props.values.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

  const height = 300
  const width = 548

  const spacingLeft = 65
  const spacingBottom = 20

  const y = useMemo(() => {
    return scaleLinear().domain([min(props.values.map(v => v.value)), max(props.values.map(v => v.value))]).range([height - spacingBottom - 30, 30])
  }, [props])

  const x = useMemo(() => {
    return scaleTime().domain([from, to]).range([0 + spacingLeft, width])
  }, [props])

  const yTicks = y.ticks(3)
  const xTicks = x.ticks(5)

  const area = (context) => {
    sorted.forEach((point, index) => {
      if (index === 0) context.moveTo(x(point.timestamp), y(point.value))
      else context.lineTo(x(point.timestamp), y(point.value))
    })
    context.lineTo(x(sorted[sorted.length - 1].timestamp), height - spacingBottom)
    context.lineTo(x(sorted[0].timestamp), height - spacingBottom)
    context.lineTo(x(sorted[0].timestamp), y(sorted[0].value))
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
      {
        props.values.length > 3
          ? <path d={area(path())} stroke={themeVariables.colorBlue} fill={themeVariables.colorBlue} fillOpacity={0.1} />
          : <text transform={`translate(${(width - spacingLeft) / 2 + spacingLeft},${(height - spacingBottom) / 2})`} textAnchor='middle' fill={themeVariables.colorDarkGrey}>Noch nicht genügend Daten erfasst.</text>
      }
      <rect x={0} y={height - spacingBottom} width={width} height={spacingBottom} fill='white' />
      <rect x={0} y={0} width={spacingLeft} height={height} fill='white' />
      <path d={axes(path())} stroke={themeVariables.colorDarkGrey} fill='none' />
      {
        yTicks.map((tick) => {
          return (
            <text key={tick} transform={`translate(55,${y(tick)})`} textAnchor='end' fill={themeVariables.colorDarkGrey} fontSize={themeVariables.fontSizeSmall}>{numberFormatter(tick, 1)}</text>
          )
        })
      }

      {
        xTicks.map((tick) => {
          return (
            <text key={tick.toString()} transform={`translate(${x(tick)},${height - spacingBottom + 20})`} textAnchor='middle' fill={themeVariables.colorDarkGrey} fontSize={themeVariables.fontSizeSmall}>{moment(tick).format('DD.MM')}</text>
          )
        })
      }
    </svg>
  )
}

export default LineChart
