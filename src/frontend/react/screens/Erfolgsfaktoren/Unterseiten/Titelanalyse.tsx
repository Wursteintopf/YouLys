import React from 'react'
import SubHeader from '../../../components/2__Compounds/SubHeader/SubHeader'
import { Headline } from '../../../components/0__Atoms/Headline/Headline'
import { ContentContainer } from '../../../../styles/GlobalStyling'
import { ContentBoxWrapper } from '../../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../../components/1__Molecules/ContentBox/ContentBox'
import { useSelector } from 'react-redux'
import { getAllVideos } from '../../../../store/channel/channel.selector'
import TitleBarChart from '../../../components/2__Compounds/TitleBarChart/TitleBarChart'
import ScatterplotWithFilters from '../../../components/2__Compounds/ScatterPlot/ScatterplotWithFilters'
import TitleBoxPlot from '../../../components/2__Compounds/TitleBoxPlot/TitleBoxPlot'
import WordCloud from '../../../components/2__Compounds/WordCloud/WordCloud'

const Titelanalyse: React.FC = () => {
  const videos = useSelector(getAllVideos)

  return (
    <>
      <SubHeader>
        <Headline>Erfolgsfaktoren - Titelanalyse</Headline>
      </SubHeader>
      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Scatterplot Darstellung' subtitle={videos.length + ' Titel analysiert'}>
            <ScatterplotWithFilters
              videos={videos}
              filters={['uppercase', 'punctuation', 'emoji']}
            />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Balkendiagram Darstellung' subtitle={videos.length + ' Titel analysiert'}>
            <TitleBarChart global />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Boxplot Darstellung (mit potentierter Achse)' subtitle={videos.length + ' Titel analysiert'}>
            <TitleBoxPlot global />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Meistgenutzte Wörter in Titeln' subtitle={videos.length + ' Titel analysiert'}>
            <WordCloud global />
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Titelanalyse
