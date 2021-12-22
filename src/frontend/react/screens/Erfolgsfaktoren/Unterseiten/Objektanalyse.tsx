import React from 'react'
import { useSelector } from 'react-redux'
import { getAllVideos } from '../../../../store/channel/channel.selector'
import { Headline } from '../../../components/0__Atoms/Headline/Headline'
import SubHeader from '../../../components/2__Compounds/SubHeader/SubHeader'
import { ContentBoxWrapper } from '../../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../../components/1__Molecules/ContentBox/ContentBox'
import ScatterplotWithFilters from '../../../components/2__Compounds/ScatterPlot/ScatterplotWithFilters'
import { ContentContainer } from '../../../../styles/GlobalStyling'
import ClickbaitObjectsBarChart
  from '../../../components/2__Compounds/ClickbaitObjectsBarChart/ClickbaitObjectsBarChart'
import FacesBoxPlot from '../../../components/2__Compounds/FacesBoxPlot/FacesBoxPlot'
import ClickbaitObjectBoxPlot from '../../../components/2__Compounds/ClickbaitObjectBoxPlot/ClickbaitObjectBoxPlot'

const Objektanalyse: React.FC = () => {
  const videos = useSelector(getAllVideos)

  return (
    <>
      <SubHeader>
        <Headline>Erfolgsfaktoren - Clickbait Objekt Analyse</Headline>
      </SubHeader>
      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Disclaimer'>
            Die Analyse der Thumbnails nach "Clickbait-Objekten" wie roten Kreisen oder Pfeilen erfolt über ein selbst trainiertes
            neuronales Netz. Dieses Netz ist jedoch noch nicht zu 100% präzise und erkennt aktuell noch einiges als Kreise oder
            Pfeile, war in Wirklichkeit keine sind, oder welche nicht, die eindeutig welche sind. Die Analyse muss hier
            daher aktuell noch etwas mit Vorsicht genossen werden, bis das Modell ausreichend trainiert ist.
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Scatterplot Darstellung' subtitle={videos.length + ' Thumbnails analysiert'}>
            <ScatterplotWithFilters
              videos={videos}
              filters={['object', 'circle', 'arrow', 'emojiThumb']}
            />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Balkendiagram Darstellung' subtitle={videos.length + ' Thumbnails analysiert'}>
            <ClickbaitObjectsBarChart global />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Boxplot Darstellung (mit potentierter Achse)' subtitle={videos.length + ' Thumbnails analysiert'}>
            <ClickbaitObjectBoxPlot global />
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Objektanalyse
