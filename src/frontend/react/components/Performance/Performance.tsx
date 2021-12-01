import React, { useMemo } from 'react'
import { PerformanceBox, PerformanceStyled } from './PerformanceStyling'
import { useSelector } from 'react-redux'
import { getNewestVideoStatistic } from '../../../store/video/video.selector'
import { getCurrentChannel } from '../../../store/channel/channel.selector'
import BoxPlot from '../BoxPlot/BoxPlot'
import { Headline } from '../Headline/Headline'
import { percentageLikes } from '../../../../shared/Utils/mathUtil'

const Performance: React.FC = () => {
  const currentStats = useSelector(getNewestVideoStatistic)
  const channel = useSelector(getCurrentChannel)

  return (
    <PerformanceStyled>
      <PerformanceBox>
        <Headline>Aufrufe</Headline>
        <BoxPlot
          minimum={channel.average_performance.views.minimum}
          lowerQuantile={channel.average_performance.views.lowerQuantile}
          median={channel.average_performance.views.median}
          upperQuantile={channel.average_performance.views.upperQuantile}
          maximum={channel.average_performance.views.maximum}
          value={currentStats.views}
          label='Aufrufe'
        />
      </PerformanceBox>
      <PerformanceBox>
        <Headline>Kommentare</Headline>
        <BoxPlot
          minimum={channel.average_performance.commentCount.minimum}
          lowerQuantile={channel.average_performance.commentCount.lowerQuantile}
          median={channel.average_performance.commentCount.median}
          upperQuantile={channel.average_performance.commentCount.upperQuantile}
          maximum={channel.average_performance.commentCount.maximum}
          value={currentStats.commentCount}
          label='Kommentare'
        />
      </PerformanceBox>
      <PerformanceBox>
        <Headline>Likes/Dislikes</Headline>
        <BoxPlot
          minimum={channel.average_performance.likes.minimum}
          lowerQuantile={channel.average_performance.likes.lowerQuantile}
          median={channel.average_performance.likes.median}
          upperQuantile={channel.average_performance.likes.upperQuantile}
          maximum={channel.average_performance.likes.maximum}
          value={currentStats.likes}
          label='Likes'
        />
      </PerformanceBox>
    </PerformanceStyled>
  )
}

export default Performance
