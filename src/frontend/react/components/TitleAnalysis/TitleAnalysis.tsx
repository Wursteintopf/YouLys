import React from 'react'
import {
  SuccessResultsInterface,
  TitleSuccessResultsInterface,
} from '../../../../shared/Domain/Model/ChannelSuccessResultsInterface'
import ContentBox from '../ContentBox/ContentBox'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../ContentBox/ContentBoxStyling'
import { Headline } from '../Headline/Headline'
import BarChart from '../BarChart/BarChart'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../store/ui/ui.selector'
import Progress from '../Progress/Progress'

interface TitleAnalysisProps {
  amountOfVideos: number
  titleSuccess: TitleSuccessResultsInterface
  maxAmount: number
  maxSuccess: number
}

const TitleAnalysis: React.FC<TitleAnalysisProps> = (props) => {
  const fetching = useSelector(getFetching)

  const Content = (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Titel / Titel mit Capslock</Headline>

          <BarChart
            maxValue={props.maxAmount}
            bars={[
              { label: 'Mit Capslock', value: props.titleSuccess.uppercase.yes.amount || 0 },
              { label: 'Ohne Capslock', value: props.titleSuccess.uppercase.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={props.maxSuccess}
            bars={[
              { label: 'Mit Capslock', value: props.titleSuccess.uppercase.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Capslock', value: props.titleSuccess.uppercase.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Titel / Titel mit übermäßigen Satzzeichen (z.B. !?!)</Headline>

          <BarChart
            maxValue={props.maxAmount}
            bars={[
              { label: 'Mit', value: props.titleSuccess.punctuation.yes.amount || 0 },
              { label: 'Ohne', value: props.titleSuccess.punctuation.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={props.maxSuccess}
            bars={[
              { label: 'Mit', value: props.titleSuccess.punctuation.yes.meanSuccessFactor || 0 },
              { label: 'Ohne', value: props.titleSuccess.punctuation.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Titel / Titel mit Emojis</Headline>

          <BarChart
            maxValue={props.maxAmount}
            bars={[
              { label: 'Mit Emoji', value: props.titleSuccess.emoji.yes.amount || 0 },
              { label: 'Ohne Emoji', value: props.titleSuccess.emoji.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={props.maxSuccess}
            bars={[
              { label: 'Mit Emoji', value: props.titleSuccess.emoji.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Emoji', value: props.titleSuccess.emoji.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>
    </>
  )

  return (
    <ContentBox title='Titelanalyse' subtitle={props.amountOfVideos + ' Titel im gewählten Zeitraum analysiert'}>
      {fetching ? <Progress /> : Content}
    </ContentBox>
  )
}

export default TitleAnalysis
