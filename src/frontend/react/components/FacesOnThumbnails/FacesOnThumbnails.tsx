import React from 'react'
import {
  FaceSuccessResultsInterface,
} from '../../../../shared/Domain/Model/ChannelSuccessResultsInterface'
import ContentBox from '../ContentBox/ContentBox'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../ContentBox/ContentBoxStyling'
import { Headline } from '../Headline/Headline'
import BarChart from '../BarChart/BarChart'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../store/ui/ui.selector'
import Progress from '../Progress/Progress'

interface FacesOnThumbnailsProps {
  amountOfVideos: number
  faceSuccess: FaceSuccessResultsInterface
  maxAmount: number
  maxSuccess: number
}

const FacesOnThumbnails: React.FC<FacesOnThumbnailsProps> = (props) => {
  const fetching = useSelector(getFetching)

  const Content = (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Existieren Gesichter</Headline>

          <BarChart
            maxValue={props.maxAmount}
            bars={[
              { label: 'Mit Gesicht', value: props.faceSuccess.existence.yes.amount || 0 },
              { label: 'Ohne Gesicht', value: props.faceSuccess.existence.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={props.maxSuccess}
            bars={[
              { label: 'Mit Gesicht', value: props.faceSuccess.existence.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Gesicht', value: props.faceSuccess.existence.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Anzahl Gesichter</Headline>

          <BarChart
            maxValue={props.maxAmount}
            bars={[
              { label: 'Keine', value: props.faceSuccess.existence.no.amount || 0 },
              { label: '1 Gesicht', value: props.faceSuccess.amount.one.amount || 0 },
              { label: '2 Gesichter', value: props.faceSuccess.amount.two.amount || 0 },
              { label: 'Mehr als 2', value: props.faceSuccess.amount.more.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={props.maxSuccess}
            bars={[
              { label: 'Keine', value: props.faceSuccess.existence.no.meanSuccessFactor || 0 },
              { label: '1 Gesicht', value: props.faceSuccess.amount.one.meanSuccessFactor || 0 },
              { label: '2 Gesichter', value: props.faceSuccess.amount.two.meanSuccessFactor || 0 },
              { label: 'Mehr als 2', value: props.faceSuccess.amount.more.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Erkannte Emotion</Headline>

          <BarChart
            maxValue={props.maxAmount}
            bars={[
              { label: 'Wütend', value: props.faceSuccess.expression.angry.amount || 0 },
              { label: 'Traurig', value: props.faceSuccess.expression.sad.amount || 0 },
              { label: 'Erstaunt', value: props.faceSuccess.expression.surprised.amount || 0 },
              { label: 'Glücklich', value: props.faceSuccess.expression.happy.amount || 0 },
              { label: 'Neutral', value: props.faceSuccess.expression.neutral.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={props.maxSuccess}
            bars={[
              { label: 'Wütend', value: props.faceSuccess.expression.angry.meanSuccessFactor || 0 },
              { label: 'Traurig', value: props.faceSuccess.expression.sad.meanSuccessFactor || 0 },
              { label: 'Erstaunt', value: props.faceSuccess.expression.surprised.meanSuccessFactor || 0 },
              { label: 'Glücklich', value: props.faceSuccess.expression.happy.meanSuccessFactor || 0 },
              { label: 'Neutral', value: props.faceSuccess.expression.neutral.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Geschlecht</Headline>

          <BarChart
            maxValue={props.maxAmount}
            bars={[
              { label: 'Männlich', value: props.faceSuccess.gender.male.amount || 0 },
              { label: 'Weiblich', value: props.faceSuccess.gender.female.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={props.maxSuccess}
            bars={[
              { label: 'Männlich', value: props.faceSuccess.gender.male.meanSuccessFactor || 0 },
              { label: 'Weiblich', value: props.faceSuccess.gender.female.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Größe des Gesichts</Headline>

          <BarChart
            maxValue={props.maxAmount}
            bars={[
              { label: 'Groß', value: props.faceSuccess.size.big.amount || 0 },
              { label: 'Klein', value: props.faceSuccess.size.small.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={props.maxSuccess}
            bars={[
              { label: 'Groß', value: props.faceSuccess.size.big.meanSuccessFactor || 0 },
              { label: 'Klein', value: props.faceSuccess.size.small.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>
    </>
  )

  return (
    <ContentBox title='Gesichter auf Thumbnails' subtitle={props.amountOfVideos + ' Thumbnails im gewählten Zeitraum analysiert'}>
      {fetching ? <Progress /> : Content}
    </ContentBox>
  )
}

export default FacesOnThumbnails
