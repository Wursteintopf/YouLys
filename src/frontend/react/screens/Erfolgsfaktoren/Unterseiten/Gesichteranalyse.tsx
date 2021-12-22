import React from 'react'
import SubHeader from '../../../components/2__Compounds/SubHeader/SubHeader'
import { Headline } from '../../../components/0__Atoms/Headline/Headline'
import { ContentContainer } from '../../../../styles/GlobalStyling'
import { ContentBoxWrapper } from '../../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../../components/1__Molecules/ContentBox/ContentBox'
import { useSelector } from 'react-redux'
import { getAllVideos } from '../../../../store/channel/channel.selector'
import ScatterplotWithFilters from '../../../components/2__Compounds/ScatterPlot/ScatterplotWithFilters'
import FacesBarChart from '../../../components/2__Compounds/FacesBarChart/FacesBarChart'
import FacesBoxPlot from '../../../components/2__Compounds/FacesBoxPlot/FacesBoxPlot'

const Gesichteranalyse: React.FC = () => {
  const videos = useSelector(getAllVideos)

  return (
    <>
      <SubHeader>
        <Headline>Erfolgsfaktoren - Gesichteranalyse</Headline>
      </SubHeader>
      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Scatterplot Darstellung' subtitle={videos.length + ' Thumbnails analysiert'}>
            <ScatterplotWithFilters
              videos={videos}
              filters={['amount', 'expression', 'sex', 'size']}
            />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Balkendiagram Darstellung' subtitle={videos.length + ' Thumbnails analysiert'}>
            <FacesBarChart global />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Boxplot Darstellung (mit potentierter Achse)' subtitle={videos.length + ' Thumbnails analysiert'}>
            <FacesBoxPlot global />
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Gesichteranalyse
