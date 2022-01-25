import React, { useMemo } from 'react'
import { scalePow } from 'd3-scale'
import themeVariables from '../../../../styles/themeVariables'
import { path } from 'd3-path'
import { useWindowWidth } from '../../../../util/Hooks'

interface SingleBox {
  label: string
  minimum: number
  lowerQuantile: number
  median: number
  upperQuantile: number
  maximum: number
}

interface StackedBoxPlotProps {
  minValue: number
  maxValue: number
  bars: SingleBox[]
}

const StackedBoxPlot: React.FC<StackedBoxPlotProps> = props => {
  const windowWidth = useWindowWidth()
  const width = windowWidth > 1200 ? 600 : (windowWidth > 800 ? (window.innerWidth / 2) : windowWidth)
  const barHeight = 40

  const spacingBottom = 50
  const spacingLeft = 110

  let yOffSet = 5

  const x = useMemo(() => {
    return scalePow().exponent(0.0000000000005).domain([props.minValue * 0.97, props.maxValue * 1.03]).range([spacingLeft, width])
  }, [props.bars, width])

  const xTicks = [0.1, 0.5, 4, 10, 100]

  const renderBar = (context, box: SingleBox) => {
    if (x(box.minimum) > 0) {
      context.moveTo(x(box.minimum), yOffSet)
      context.lineTo(x(box.minimum), yOffSet + barHeight)

      context.moveTo(x(box.minimum), yOffSet + (barHeight / 2))
    } else {
      context.moveTo(x(box.minimum), yOffSet + (barHeight / 2))
    }

    context.lineTo(x(box.lowerQuantile), yOffSet + (barHeight / 2))

    context.moveTo(x(box.lowerQuantile), yOffSet)
    context.lineTo(x(box.lowerQuantile), yOffSet + barHeight)
    context.lineTo(x(box.upperQuantile), yOffSet + barHeight)
    context.lineTo(x(box.upperQuantile), yOffSet)
    context.lineTo(x(box.lowerQuantile), yOffSet)

    context.moveTo(x(box.median), yOffSet)
    context.lineTo(x(box.median), yOffSet + barHeight)

    context.moveTo(x(box.upperQuantile), yOffSet + (barHeight / 2))
    context.lineTo(x(box.maximum), yOffSet + (barHeight / 2))

    context.moveTo(x(box.maximum), yOffSet)
    context.lineTo(x(box.maximum), yOffSet + barHeight)

    return context
  }

  const renderAxis = (context) => {
    context.moveTo(spacingLeft, 0)
    context.lineTo(spacingLeft, yOffSet)
    context.lineTo(width, yOffSet)

    xTicks.forEach(tick => {
      context.moveTo(x(tick), yOffSet - 3)
      context.lineTo(x(tick), yOffSet + 3)
    })

    return context
  }

  const renderGrid = (context) => {
    xTicks.forEach(tick => {
      context.moveTo(x(tick), 0)
      context.lineTo(x(tick), props.bars.length * (barHeight + 5))
    })

    return context
  }

  return (
    <svg style={{ marginTop: themeVariables.spacingM }} viewBox={'0 0 ' + width + ' ' + ((props.bars.length * (barHeight + 5)) + spacingBottom)}>
      <path d={renderGrid(path())} fill='none' stroke={themeVariables.colorLightGrey} strokeWidth={1} />
      {
        props.bars.map((bar, index) => {
          const returnVal = (
            <g key={index}>
              <path d={renderBar(path(), bar)} fill='none' stroke={themeVariables.colorDarkGrey} strokeWidth={2} />
              <rect x={0} y={yOffSet} width={spacingLeft} height={barHeight * 2} fill={themeVariables.colorWhite} />
              <text x={0} y={yOffSet + barHeight / 2} fill={themeVariables.colorDarkGrey}>{bar.label}</text>
            </g>
          )

          yOffSet += barHeight + 5

          return returnVal
        })
      }
      <path d={renderAxis(path())} fill='none' stroke={themeVariables.colorDarkGrey} strokeWidth={1} />
      {
        xTicks.map(tick => {
          return (
            <text key={tick} x={x(tick)} y={yOffSet + 20} fill={themeVariables.colorDarkGrey} textAnchor='middle'>{tick}</text>
          )
        })
      }
    </svg>
  )
}

export default StackedBoxPlot
