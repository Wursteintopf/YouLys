import React from 'react'
import { SuccessResultsInterface } from '../../../../shared/Domain/Model/ChannelSuccessResultsInterface'
import ContentBox from '../ContentBox/ContentBox'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../ContentBox/ContentBoxStyling'
import { Headline } from '../Headline/Headline'
import BarChart from '../BarChart/BarChart'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../store/ui/ui.selector'
import Progress from '../Progress/Progress'

interface TitleAnalysisProps {
  success: SuccessResultsInterface
  maxAmount: number
  maxSuccess: number
}

const TitleAnalysis: React.FC<TitleAnalysisProps> = ({ success, maxAmount, maxSuccess }) => {
  const titleSuccess = success.title
  const fetching = useSelector(getFetching)

  const Content = (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Titel / Titel mit Capslock</Headline>

          <BarChart
            maxValue={maxAmount}
            bars={[
              { label: 'Mit Capslock', value: titleSuccess.uppercase.yes.amount || 0 },
              { label: 'Ohne Capslock', value: titleSuccess.uppercase.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={maxSuccess}
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
            maxValue={maxAmount}
            bars={[
              { label: 'Mit', value: titleSuccess.punctuation.yes.amount || 0 },
              { label: 'Ohne', value: titleSuccess.punctuation.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={maxSuccess}
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
            maxValue={maxAmount}
            bars={[
              { label: 'Mit Emoji', value: titleSuccess.emoji.yes.amount || 0 },
              { label: 'Ohne Emoji', value: titleSuccess.emoji.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={maxSuccess}
            bars={[
              { label: 'Mit Emoji', value: titleSuccess.emoji.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Emoji', value: titleSuccess.emoji.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>
    </>
  )

  return (
    <ContentBox title='Titelanalyse' subtitle={success.amountOfVideosAnalyzed + ' Titel im gewählten Zeitraum analysiert'}>
      {fetching ? <Progress /> : Content}
    </ContentBox>
  )
}

export default TitleAnalysis
