import React, { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import themeVariables from '../../../styles/themeVariables'
import { path } from 'd3-path'

export interface StackedBarGraphProps {
  labelSingular: string
  labelPlural: string
  segment: number[]
}

const stackSegment = (array: number[]) => {
  let offset = 0

  return array.map((value, index) => {
    const oldVal = offset
    offset += value

    return [oldVal, offset]
  })
}

const StackedBarGraph: React.FC<StackedBarGraphProps> = (props) => {
  const maxValue = props.segment.reduce((a, b) => { return a + b }, 0)

  const width = 600
  const barHeight = 40

  const spacingBottom = 50

  let yOffSet = 0

  const x = useMemo(() => {
    return scaleLinear().domain([0, maxValue]).range([0, width])
  }, [props.segment])

  const renderAxis = (context, from, to) => {
    context.moveTo(from, barHeight)
    context.lineTo(from, barHeight + 10)
    context.moveTo(from, barHeight + 5)
    context.lineTo(to, barHeight + 5)

    return context
  }

  const renderBar = () => {
    const stackedSegment = stackSegment(props.segment)

    yOffSet += barHeight

    return (
      <g>
        {
          stackedSegment.map((value, index) => {
            return (
              <g>
                <rect key={index} x={x(value[0])} y={yOffSet - barHeight} width={x(props.segment[index])} height={barHeight - 3} fill={themeVariables.blueShades[index + 1]} />
                <path d={renderAxis(path(), x(value[0]), x(value[1]))} stroke={themeVariables.colorDarkGrey} strokeWidth={1} />
                {props.segment[index] > 0 ? <text x={x(props.segment[index]) / 2 + x(value[0])} y={barHeight + 23} textAnchor='middle' fill={themeVariables.colorDarkGrey}>{index} {index === 1 ? props.labelSingular : props.labelPlural}</text> : ''}
                {props.segment[index] > 0 ? <text x={x(props.segment[index]) / 2 + x(value[0])} y={barHeight + 41} textAnchor='middle' fill={themeVariables.colorDarkGrey}>{props.segment[index]} {props.segment[index] === 1 ? 'Video' : 'Videos'}</text> : ''}
              </g>
            )
          })
        }
      </g>
    )
  }

  return (
    <svg style={{ marginTop: themeVariables.spacingM }} viewBox={'0 0 ' + width + ' ' + (barHeight + spacingBottom)}>
      {renderBar()}
    </svg>
  )
}

export default StackedBarGraph
