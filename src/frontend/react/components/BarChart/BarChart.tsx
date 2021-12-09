import React, { useMemo } from 'react'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import themeVariables from '../../../styles/themeVariables'
import { path } from 'd3-path'

interface SingleBar {
  value: number
  label: string
}

interface BarChartProps {
  maxValue: number
  bars: SingleBar[]
}

const BarChart: React.FC<BarChartProps> = (props) => {
  const width = 600
  const barHeight = 40

  const spacingBottom = 50
  const spacingLeft = 110

  let yOffSet = 0

  const x = useMemo(() => {
    return scaleLinear().domain([0, props.maxValue]).range([0, width - spacingLeft])
  }, [props.bars])

  const xTicks = x.ticks(3)

  const renderBars = () => {
    return props.bars.map((bar, index) => {
      const returnVal = (
        <g key={index}>
          <rect x={spacingLeft} y={yOffSet + 2} width={x(bar.value)} height={barHeight - 2} fill={themeVariables.blueShades[index]} />
          <text x={0} y={yOffSet + barHeight / 2 + 5} fill={themeVariables.colorDarkGrey}>{bar.label}</text>
        </g>
      )

      yOffSet += barHeight

      return returnVal
    })
  }

  const renderAxis = (context) => {
    context.moveTo(spacingLeft, 0)
    context.lineTo(spacingLeft, yOffSet)
    context.lineTo(width, yOffSet)

    xTicks.forEach(tick => {
      context.moveTo(spacingLeft + x(tick), yOffSet - 3)
      context.lineTo(spacingLeft + x(tick), yOffSet + 3)
    })

    return context
  }

  return (
    <svg style={{ marginTop: themeVariables.spacingM }} viewBox={'0 0 ' + width + ' ' + (props.bars.length * barHeight + spacingBottom)}>
      {renderBars()}
      <path d={renderAxis(path())} fill='none' stroke={themeVariables.colorDarkGrey} strokeWidth={1} />
      {
        xTicks.map(tick => {
          return (
            <text key={tick} x={spacingLeft + x(tick)} y={yOffSet + 20} fill={themeVariables.colorDarkGrey} textAnchor='middle'>{tick}</text>
          )
        })
      }
    </svg>
  )
}

export default BarChart
