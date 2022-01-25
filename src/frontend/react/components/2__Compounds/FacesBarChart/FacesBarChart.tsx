import React from 'react'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../../1__Molecules/ContentBox/ContentBoxStyling'
import { Headline } from '../../0__Atoms/Headline/Headline'
import BarChart from '../../0__Atoms/BarChart/BarChart'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'
import { getCurrentChannelFaceSuccess, getFaceSuccess } from '../../../../store/channel/channel.selector'

interface FacesOnThumbnailsProps {
  global?: boolean
}

const FacesBarChart: React.FC<FacesOnThumbnailsProps> = ({ global }) => {
  const faceSuccess = global ? useSelector(getFaceSuccess) : useSelector(getCurrentChannelFaceSuccess)
  const fetching = useSelector(getFetching)

  if (fetching) return <Progress />

  if (faceSuccess.count === 0) return <>Im ausgewählten Zeitraum wurden keine Videos veröffentlicht.</>

  return (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Existieren Gesichter</Headline>

          <BarChart
            maxValue={faceSuccess.maxAmount}
            bars={[
              { label: 'Mit Gesicht', value: faceSuccess.existence.yes.amount || 0 },
              { label: 'Ohne Gesicht', value: faceSuccess.existence.no.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={faceSuccess.maxMeanSuccess}
            bars={[
              { label: 'Mit Gesicht', value: faceSuccess.existence.yes.meanSuccessFactor || 0 },
              { label: 'Ohne Gesicht', value: faceSuccess.existence.no.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Anzahl Gesichter</Headline>

          <BarChart
            maxValue={faceSuccess.maxAmount}
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
            maxValue={faceSuccess.maxMeanSuccess}
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
            maxValue={faceSuccess.maxAmount}
            bars={[
              { label: 'Wütend', value: faceSuccess.expression.angry.amount || 0 },
              { label: 'Ängstlich', value: faceSuccess.expression.fearful.amount || 0 },
              { label: 'Traurig', value: faceSuccess.expression.sad.amount || 0 },
              { label: 'Erstaunt', value: faceSuccess.expression.surprised.amount || 0 },
              { label: 'Glücklich', value: faceSuccess.expression.happy.amount || 0 },
              { label: 'Angeekelt', value: faceSuccess.expression.disgusted.amount || 0 },
              { label: 'Neutral', value: faceSuccess.expression.neutral.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={faceSuccess.maxMeanSuccess}
            bars={[
              { label: 'Wütend', value: faceSuccess.expression.angry.meanSuccessFactor || 0 },
              { label: 'Ängstlich', value: faceSuccess.expression.fearful.meanSuccessFactor || 0 },
              { label: 'Traurig', value: faceSuccess.expression.sad.meanSuccessFactor || 0 },
              { label: 'Erstaunt', value: faceSuccess.expression.surprised.meanSuccessFactor || 0 },
              { label: 'Glücklich', value: faceSuccess.expression.happy.meanSuccessFactor || 0 },
              { label: 'Angeekelt', value: faceSuccess.expression.disgusted.meanSuccessFactor || 0 },
              { label: 'Neutral', value: faceSuccess.expression.neutral.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl Thumbnails / Geschlecht</Headline>

          <BarChart
            maxValue={faceSuccess.maxAmount}
            bars={[
              { label: 'Männlich', value: faceSuccess.gender.male.amount || 0 },
              { label: 'Weiblich', value: faceSuccess.gender.female.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschnittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={faceSuccess.maxMeanSuccess}
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
            maxValue={faceSuccess.maxAmount}
            bars={[
              { label: 'Groß', value: faceSuccess.size.big.amount || 0 },
              { label: 'Klein', value: faceSuccess.size.small.amount || 0 },
            ]}
          />
        </ContentBoxDivider>

        <ContentBoxDivider>
          <Headline>Durchschittlicher Erfolgswert</Headline>

          <BarChart
            maxValue={faceSuccess.maxMeanSuccess}
            bars={[
              { label: 'Groß', value: faceSuccess.size.big.meanSuccessFactor || 0 },
              { label: 'Klein', value: faceSuccess.size.small.meanSuccessFactor || 0 },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>
    </>
  )
}

export default FacesBarChart
