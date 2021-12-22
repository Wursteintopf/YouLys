import React from 'react'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../../1__Molecules/ContentBox/ContentBoxStyling'
import { Headline } from '../../0__Atoms/Headline/Headline'
import BarChart from '../../0__Atoms/BarChart/BarChart'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'
import {
  getClickbaitObjectSuccess, getCurrentChannelClickbaitObjectSuccess,
} from '../../../../store/channel/channel.selector'

interface ClickbaitObjectsBarChartProps {
  global?: boolean
}

const ClickbaitObjectsBarChart: React.FC<ClickbaitObjectsBarChartProps> = ({ global }) => {
  const clickbaitObjectSuccess = global ? useSelector(getClickbaitObjectSuccess) : useSelector(getCurrentChannelClickbaitObjectSuccess)
  const fetching = useSelector(getFetching)

  if (fetching) return <Progress />

  return (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Existieren Clickbait Kreise</Headline>

          <BarChart
            maxValue={clickbaitObjectSuccess.maxAmount}
            bars={[
              { label: 'Mit Kreisen', value: clickbaitObjectSuccess.circle.yes.amount || 0 },
              { label: 'Ohne Kreise', value: clickbaitObjectSuccess.circle.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={clickbaitObjectSuccess.maxMeanSuccess}
            bars={[
              { label: 'Mit Kreisen', value: clickbaitObjectSuccess.circle.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Kreise', value: clickbaitObjectSuccess.circle.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Existieren Clickbait Pfeile</Headline>

          <BarChart
            maxValue={clickbaitObjectSuccess.maxAmount}
            bars={[
              { label: 'Mit Pfeilen', value: clickbaitObjectSuccess.arrow.yes.amount || 0 },
              { label: 'Ohne Pfeile', value: clickbaitObjectSuccess.arrow.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={clickbaitObjectSuccess.maxMeanSuccess}
            bars={[
              { label: 'Mit Pfeilen', value: clickbaitObjectSuccess.arrow.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Pfeile', value: clickbaitObjectSuccess.arrow.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Existieren Emojis</Headline>

          <BarChart
            maxValue={clickbaitObjectSuccess.maxAmount}
            bars={[
              { label: 'Mit Emojis', value: clickbaitObjectSuccess.emojiThumb.yes.amount || 0 },
              { label: 'Ohne Emojis', value: clickbaitObjectSuccess.emojiThumb.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={clickbaitObjectSuccess.maxMeanSuccess}
            bars={[
              { label: 'Mit Emojis', value: clickbaitObjectSuccess.emojiThumb.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Emojis', value: clickbaitObjectSuccess.emojiThumb.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>
    </>
  )
}

export default ClickbaitObjectsBarChart
