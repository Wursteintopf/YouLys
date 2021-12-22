import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentChannelFaceSuccess, getFaceSuccess } from '../../../../store/channel/channel.selector'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'
import { ContentBoxDivider, ContentBoxDividerWrapper } from '../../1__Molecules/ContentBox/ContentBoxStyling'
import { Headline } from '../../0__Atoms/Headline/Headline'
import StackedBoxPlot from '../../0__Atoms/StackedBoxPlot/StackedBoxPlot'

interface FacesBoxPlotProps {
  global?: boolean
}

const FacesBoxPlot: React.FC<FacesBoxPlotProps> = ({ global }) => {
  const faceSuccess = global ? useSelector(getFaceSuccess) : useSelector(getCurrentChannelFaceSuccess)
  const fetching = useSelector(getFetching)

  if (fetching) return <Progress />

  return (
    <>
      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Anzahl der Gesichter</Headline>

          <StackedBoxPlot
            minValue={faceSuccess.minSuccess}
            maxValue={faceSuccess.maxSuccess}
            bars={[
              { label: 'Keine', ...faceSuccess.existence.no },
              { label: '1 Gesicht', ...faceSuccess.amount.one },
              { label: '2 Gesichter', ...faceSuccess.amount.two },
              { label: 'Mehr als 2', ...faceSuccess.amount.more },
            ]}
          />
        </ContentBoxDivider>
        <ContentBoxDivider>
          <Headline>Emotion</Headline>

          <StackedBoxPlot
            minValue={faceSuccess.minSuccess}
            maxValue={faceSuccess.maxSuccess}
            bars={[
              { label: 'Wütend', ...faceSuccess.expression.angry },
              { label: 'Ängstlich', ...faceSuccess.expression.fearful },
              { label: 'Traurig', ...faceSuccess.expression.sad },
              { label: 'Erstaunt', ...faceSuccess.expression.surprised },
              { label: 'Glücklich', ...faceSuccess.expression.happy },
              { label: 'Angeekelt', ...faceSuccess.expression.disgusted },
              { label: 'Neutral', ...faceSuccess.expression.neutral },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>

      <ContentBoxDividerWrapper>
        <ContentBoxDivider>
          <Headline>Geschlecht</Headline>

          <StackedBoxPlot
            minValue={faceSuccess.minSuccess}
            maxValue={faceSuccess.maxSuccess}
            bars={[
              { label: 'Männlich', ...faceSuccess.gender.male },
              { label: 'Weiblich', ...faceSuccess.gender.female },
            ]}
          />
        </ContentBoxDivider>
        <ContentBoxDivider>
          <Headline>Größe des Gesichts</Headline>

          <StackedBoxPlot
            minValue={faceSuccess.minSuccess}
            maxValue={faceSuccess.maxSuccess}
            bars={[
              { label: 'Groß', ...faceSuccess.size.big },
              { label: 'Klein', ...faceSuccess.size.small },
            ]}
          />
        </ContentBoxDivider>
      </ContentBoxDividerWrapper>
    </>
  )
}

export default FacesBoxPlot
