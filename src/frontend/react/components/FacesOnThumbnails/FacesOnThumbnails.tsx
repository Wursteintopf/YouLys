import React from 'react'
import { SuccessResultsInterface } from '../../../../shared/Domain/Model/ChannelSuccessResultsInterface'
import ContentBox from '../ContentBox/ContentBox'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../ContentBox/ContentBoxStyling'
import { Headline } from '../Headline/Headline'
import BarChart from '../BarChart/BarChart'
import { ContentBoxWrapper } from '../ContentBox/ContentBoxWrapper'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../store/ui/ui.selector'
import Progress from '../Progress/Progress'

interface FacesOnThumbnailsProps {
  success: SuccessResultsInterface
  maxAmountFaces: number
  maxSuccessFaces: number
}

const FacesOnThumbnails: React.FC<FacesOnThumbnailsProps> = ({ success, maxAmountFaces, maxSuccessFaces }) => {
  const faceSuccess = success.faces
  const fetching = useSelector(getFetching)

  const Content = (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Anzahl Gesichter</Headline>

          <BarChart
            maxValue={maxAmountFaces}
            bars={[
              { label: 'Keine', value: faceSuccess.existence.no.amount || 0 },
              { label: '1 Gesicht', value: faceSuccess.amount.one.amount || 0 },
              { label: '2 Gesichter', value: faceSuccess.amount.two.amount || 0 },
              { label: 'Mehr als 2', value: faceSuccess.amount.more.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={maxSuccessFaces}
            bars={[
              { label: 'Keine', value: faceSuccess.existence.no.meanSuccessFactor || 0 },
              { label: '1 Gesicht', value: faceSuccess.amount.one.meanSuccessFactor || 0 },
              { label: '2 Gesichter', value: faceSuccess.amount.two.meanSuccessFactor || 0 },
              { label: 'Mehr als 2', value: faceSuccess.amount.more.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Erkannte Emotion</Headline>

          <BarChart
            maxValue={maxAmountFaces}
            bars={[
              { label: 'Wütend', value: faceSuccess.expression.angry.amount || 0 },
              { label: 'Traurig', value: faceSuccess.expression.sad.amount || 0 },
              { label: 'Erstaunt', value: faceSuccess.expression.surprised.amount || 0 },
              { label: 'Glücklich', value: faceSuccess.expression.happy.amount || 0 },
              { label: 'Neutral', value: faceSuccess.expression.neutral.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={maxSuccessFaces}
            bars={[
              { label: 'Wütend', value: faceSuccess.expression.angry.meanSuccessFactor || 0 },
              { label: 'Traurig', value: faceSuccess.expression.sad.meanSuccessFactor || 0 },
              { label: 'Erstaunt', value: faceSuccess.expression.surprised.meanSuccessFactor || 0 },
              { label: 'Glücklich', value: faceSuccess.expression.happy.meanSuccessFactor || 0 },
              { label: 'Neutral', value: faceSuccess.expression.neutral.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Geschlecht</Headline>

          <BarChart
            maxValue={maxAmountFaces}
            bars={[
              { label: 'Männlich', value: faceSuccess.gender.male.amount || 0 },
              { label: 'Weiblich', value: faceSuccess.gender.female.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={maxSuccessFaces}
            bars={[
              { label: 'Männlich', value: faceSuccess.gender.male.meanSuccessFactor || 0 },
              { label: 'Weiblich', value: faceSuccess.gender.female.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Größe des Gesichts</Headline>

          <BarChart
            maxValue={maxAmountFaces}
            bars={[
              { label: 'Groß', value: faceSuccess.size.big.amount || 0 },
              { label: 'Klein', value: faceSuccess.size.small.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={maxSuccessFaces}
            bars={[
              { label: 'Groß', value: faceSuccess.size.big.meanSuccessFactor || 0 },
              { label: 'Klein', value: faceSuccess.size.small.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>
    </>
  )

  return (
    <ContentBoxWrapper amountOfChildren={1}>
      <ContentBox title='Gesichter auf Thumbnails' subtitle={success.amountOfVideosAnalyzed + ' Thumbnails im gewählten Zeitraum analysiert'}>
        {fetching ? <Progress /> : Content}
      </ContentBox>
    </ContentBoxWrapper>
  )
}

export default FacesOnThumbnails
