import React from 'react'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../../1__Molecules/ContentBox/ContentBoxStyling'
import { Headline } from '../../0__Atoms/Headline/Headline'
import BarChart from '../../0__Atoms/BarChart/BarChart'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'
import { getCurrentChannelTitleSuccess, getTitleSuccess } from '../../../../store/channel/channel.selector'

interface TitleAnalysisProps {
  global?: boolean
}

const TitleBarChart: React.FC<TitleAnalysisProps> = ({ global }) => {
  const titleSuccess = global ? useSelector(getTitleSuccess) : useSelector(getCurrentChannelTitleSuccess)
  const fetching = useSelector(getFetching)

  if (fetching) return <Progress />

  return (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Titel / Titel mit Capslock</Headline>

          <BarChart
            maxValue={titleSuccess.maxAmount}
            bars={[
              { label: 'Mit Capslock', value: titleSuccess.uppercase.yes.amount || 0 },
              { label: 'Ohne Capslock', value: titleSuccess.uppercase.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={titleSuccess.maxMeanSuccess}
            bars={[
              { label: 'Mit Capslock', value: titleSuccess.uppercase.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Capslock', value: titleSuccess.uppercase.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Titel / Titel mit übermäßigen Satzzeichen (z.B. !?!)</Headline>

          <BarChart
            maxValue={titleSuccess.maxAmount}
            bars={[
              { label: 'Mit', value: titleSuccess.punctuation.yes.amount || 0 },
              { label: 'Ohne', value: titleSuccess.punctuation.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={titleSuccess.maxMeanSuccess}
            bars={[
              { label: 'Mit', value: titleSuccess.punctuation.yes.meanSuccessFactor || 0 },
              { label: 'Ohne', value: titleSuccess.punctuation.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Titel / Titel mit Emojis</Headline>

          <BarChart
            maxValue={titleSuccess.maxAmount}
            bars={[
              { label: 'Mit Emoji', value: titleSuccess.emoji.yes.amount || 0 },
              { label: 'Ohne Emoji', value: titleSuccess.emoji.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={titleSuccess.maxMeanSuccess}
            bars={[
              { label: 'Mit Emoji', value: titleSuccess.emoji.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Emoji', value: titleSuccess.emoji.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>
    </>
  )
}

export default TitleBarChart
