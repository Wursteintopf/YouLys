import React, { useMemo } from 'react'
import { PerformanceBox, PerformanceStyled } from './PerformanceStyling'
import { useSelector } from 'react-redux'
import { getNewestVideoStatistic, getCurrentChannelAveragePerformance } from '../../../../store/channel/channel.selector'
import BoxPlot from '../../0__Atoms/BoxPlot/BoxPlot'
import { Headline } from '../../0__Atoms/Headline/Headline'

const VideoPerformance: React.FC = () => {
  const currentStats = useSelector(getNewestVideoStatistic)
  const average_performance = useSelector(getCurrentChannelAveragePerformance)

  return (
    <PerformanceStyled>
      <PerformanceBox>
        <Headline>Aufrufe</Headline>
        <BoxPlot
          range={[average_performance.views.minimum, average_performance.views.maximum]}
          minimum={average_performance.views.minimum}
          lowerQuantile={average_performance.views.lowerQuantile}
          median={average_performance.views.median}
          upperQuantile={average_performance.views.upperQuantile}
          maximum={average_performance.views.maximum}
          value={currentStats.views}
          label='Aufrufe'
        />
      </PerformanceBox>
      <PerformanceBox>
        <Headline>Kommentare</Headline>
        <BoxPlot
          range={[average_performance.commentCount.minimum, average_performance.commentCount.maximum]}
          minimum={average_performance.commentCount.minimum}
          lowerQuantile={average_performance.commentCount.lowerQuantile}
          median={average_performance.commentCount.median}
          upperQuantile={average_performance.commentCount.upperQuantile}
          maximum={average_performance.commentCount.maximum}
          value={currentStats.commentCount}
          label='Kommentare'
        />
      </PerformanceBox>
      <PerformanceBox>
        <Headline>Likes/Dislikes</Headline>
        <BoxPlot
          range={[average_performance.likes.minimum, average_performance.likes.maximum]}
          minimum={average_performance.likes.minimum}
          lowerQuantile={average_performance.likes.lowerQuantile}
          median={average_performance.likes.median}
          upperQuantile={average_performance.likes.upperQuantile}
          maximum={average_performance.likes.maximum}
          value={currentStats.likes}
          label='Likes'
        />
      </PerformanceBox>
    </PerformanceStyled>
  )
}

export default VideoPerformance
