import React, { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { path } from 'd3-path'
import themeVariables from '../../../../styles/themeVariables'
import numberFormatter from '../../../../util/NumberFormatter'
import { useWindowWidth } from '../../../../util/Hooks'

interface BoxPlotProps {
  range: [number, number]
  minimum: number
  lowerQuantile: number
  median: number
  upperQuantile: number
  maximum: number
  value?: number
  removeLabels?: boolean
  overSize?: boolean
  label: string
}

const BoxPlot: React.FC<BoxPlotProps> = (props) => {
  const windowWidth = useWindowWidth()
  const width = windowWidth > 1200 ? 250 : (windowWidth > 1000 ? 200 : (windowWidth > 800 ? 170 : (windowWidth > 600 ? 130 : 200)))
  const height = windowWidth > 1200 ? 150 : (windowWidth > 1000 ? 140 : (windowWidth > 800 ? 130 : (windowWidth > 600 ? 120 : 130)))
  const spacingTop = props.value ? 50 : 5
  const spacingBottom = 30
  const spacingHorizontal = 25
  const boxHeight = height - spacingBottom - spacingTop

  const x = useMemo(() => {
    return scaleLinear().domain(props.range).range([spacingHorizontal, width - spacingHorizontal])
  }, [props, width])

  const drawBoxplot = (context) => {
    context.moveTo(x(props.minimum), spacingTop)
    context.lineTo(x(props.minimum), height - spacingBottom)

    context.moveTo(x(props.lowerQuantile), spacingTop)
    context.lineTo(x(props.upperQuantile), spacingTop)
    context.lineTo(x(props.upperQuantile), height - spacingBottom)
    context.lineTo(x(props.lowerQuantile), height - spacingBottom)
    context.lineTo(x(props.lowerQuantile), spacingTop)

    context.moveTo(x(props.median), spacingTop)
    context.lineTo(x(props.median), height - spacingBottom)

    context.moveTo(x(props.minimum), boxHeight / 2 + spacingTop)
    context.lineTo(x(props.lowerQuantile), boxHeight / 2 + spacingTop)

    if (props.overSize) {
      context.moveTo(width - spacingHorizontal, spacingTop)
      context.lineTo(width - spacingHorizontal, height - spacingBottom)

      context.moveTo(x(props.upperQuantile), boxHeight / 2 + spacingTop)
      context.lineTo(width - spacingHorizontal, boxHeight / 2 + spacingTop)
    } else {
      context.moveTo(x(props.maximum), spacingTop)
      context.lineTo(x(props.maximum), height - spacingBottom)

      context.moveTo(x(props.upperQuantile), boxHeight / 2 + spacingTop)
      context.lineTo(x(props.maximum), boxHeight / 2 + spacingTop)
    }

    return context
  }

  const drawArrow = (context) => {
    context.moveTo(x(props.value), spacingTop - 3)
    context.lineTo(x(props.value) + 7, spacingTop - 10)
    context.lineTo(x(props.value) - 7, spacingTop - 10)

    return context
  }

  const renderValue = () => {
    return (
      <>
        <path d={drawArrow(path())} fill={themeVariables.colorDarkGrey} />
        <text x={x(props.value)} y={spacingTop - 25} fill={themeVariables.colorDarkGrey} textAnchor='middle' fontSize={11}>
          {numberFormatter(props.value)}
        </text>
        <text x={x(props.value)} y={spacingTop - 15} fill={themeVariables.colorDarkGrey} textAnchor='middle' fontSize={8}>{props.label}</text>
      </>
    )
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <path d={drawBoxplot(path())} fill='none' stroke={themeVariables.colorDarkGrey} strokeWidth={1} />

      {props.value && renderValue()}

      <text x={x(props.minimum)} y={spacingTop + boxHeight + 13} fill={themeVariables.colorDarkGrey} textAnchor='middle' fontSize={11}>
        {numberFormatter(props.minimum)}
      </text>
      <text x={x(props.minimum)} y={spacingTop + boxHeight + 23} fill={themeVariables.colorDarkGrey} textAnchor='middle' fontSize={8}>{props.label}</text>

      <text x={x(props.maximum)} y={spacingTop + boxHeight + 13} fill={themeVariables.colorDarkGrey} textAnchor='middle' fontSize={11}>
        {numberFormatter(props.maximum)}
      </text>
      <text x={x(props.maximum)} y={spacingTop + boxHeight + 23} fill={themeVariables.colorDarkGrey} textAnchor='middle' fontSize={8}>{props.label}</text>
    </svg>
  )
}

export default BoxPlot
