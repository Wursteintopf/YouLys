import React from 'react'
import { useSelector } from 'react-redux'
import {
  getClickbaitObjectSuccess,
  getCurrentChannelClickbaitObjectSuccess,
} from '../../../../store/channel/channel.selector'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../../1__Molecules/ContentBox/ContentBoxStyling'
import { Headline } from '../../0__Atoms/Headline/Headline'
import StackedBoxPlot from '../../0__Atoms/StackedBoxPlot/StackedBoxPlot'

interface ClickbaitObjectBoxPlotProps {
  global?: boolean
}

const ClickbaitObjectBoxPlot: React.FC<ClickbaitObjectBoxPlotProps> = ({ global }) => {
  const clickBaitObjectSuccess = global ? useSelector(getClickbaitObjectSuccess) : useSelector(getCurrentChannelClickbaitObjectSuccess)
  const fetching = useSelector(getFetching)

  if (fetching) return <Progress />

  return (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Objekte im Vergleich</Headline>

          <StackedBoxPlot
            minValue={clickBaitObjectSuccess.minSuccess}
            maxValue={clickBaitObjectSuccess.maxSuccess}
            bars={[
              { label: 'Kreis', ...clickBaitObjectSuccess.circle.yes },
              { label: 'Pfeil', ...clickBaitObjectSuccess.arrow.yes },
              { label: 'Emoji', ...clickBaitObjectSuccess.emojiThumb.yes },
            ]}
          />
        </ContentBoxDivider>
        <ContentBoxDivider>
          <Headline>Kreis auf dem Thumbnail</Headline>

          <StackedBoxPlot
            minValue={clickBaitObjectSuccess.minSuccess}
            maxValue={clickBaitObjectSuccess.maxSuccess}
            bars={[
              { label: 'Mit Kreis', ...clickBaitObjectSuccess.circle.yes },
              { label: 'Ohne Kreis', ...clickBaitObjectSuccess.circle.no },
            ]}
          />
        </ContentBoxDivider>

      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Pfeil auf dem Thumbnail</Headline>

          <StackedBoxPlot
            minValue={clickBaitObjectSuccess.minSuccess}
            maxValue={clickBaitObjectSuccess.maxSuccess}
            bars={[
              { label: 'Mit Pfeil', ...clickBaitObjectSuccess.arrow.yes },
              { label: 'Ohne Pfeil', ...clickBaitObjectSuccess.arrow.no },
            ]}
          />
        </ContentBoxDivider>
        <ContentBoxDivider>
          <Headline>Emojis auf dem Thumbnail</Headline>

          <StackedBoxPlot
            minValue={clickBaitObjectSuccess.minSuccess}
            maxValue={clickBaitObjectSuccess.maxSuccess}
            bars={[
              { label: 'Mit Emoji', ...clickBaitObjectSuccess.emojiThumb.yes },
              { label: 'Ohne Emoji', ...clickBaitObjectSuccess.emojiThumb.no },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>
    </>
  )
}

export default ClickbaitObjectBoxPlot
