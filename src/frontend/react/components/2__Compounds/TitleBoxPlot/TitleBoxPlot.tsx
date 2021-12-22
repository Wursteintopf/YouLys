import React from 'react'
import { useSelector } from 'react-redux'
import {
  getCurrentChannelTitleSuccess,
  getTitleSuccess,
} from '../../../../store/channel/channel.selector'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../../1__Molecules/ContentBox/ContentBoxStyling'
import { Headline } from '../../0__Atoms/Headline/Headline'
import StackedBoxPlot from '../../0__Atoms/StackedBoxPlot/StackedBoxPlot'

interface TitleBoxPlotProps {
  global?: boolean
}

const TitleBoxPlot: React.FC<TitleBoxPlotProps> = ({ global }) => {
  const titleSuccess = global ? useSelector(getTitleSuccess) : useSelector(getCurrentChannelTitleSuccess)
  const fetching = useSelector(getFetching)

  if (fetching) return <Progress />

  return (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Capslock im Titel</Headline>

          <StackedBoxPlot
            minValue={titleSuccess.minSuccess}
            maxValue={titleSuccess.maxSuccess}
            bars={[
              { label: 'Mit Capslock', ...titleSuccess.uppercase.yes },
              { label: 'Ohne Capslock', ...titleSuccess.uppercase.no },
            ]}
          />
        </ContentBoxDivider>
        <ContentBoxDivider>
          <Headline>Übermäßige Satzzeichen (z.B. ?!?)</Headline>

          <StackedBoxPlot
            minValue={titleSuccess.minSuccess}
            maxValue={titleSuccess.maxSuccess}
            bars={[
              { label: 'Mit', ...titleSuccess.punctuation.yes },
              { label: 'Ohne', ...titleSuccess.punctuation.no },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Emojis im Titel</Headline>

          <StackedBoxPlot
            minValue={titleSuccess.minSuccess}
            maxValue={titleSuccess.maxSuccess}
            bars={[
              { label: 'Mit Emoji', ...titleSuccess.emoji.yes },
              { label: 'Ohne Emoji', ...titleSuccess.emoji.no },
            ]}
          />
        </ContentBoxDivider>
        <ContentBoxDivider />
      </ContentBoxDividerWrapper>
    </>
  )
}

export default TitleBoxPlot
