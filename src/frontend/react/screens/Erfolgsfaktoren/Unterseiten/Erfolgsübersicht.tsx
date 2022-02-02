import React from 'react'
import SubHeader from '../../../components/2__Compounds/SubHeader/SubHeader'
import { Headline } from '../../../components/0__Atoms/Headline/Headline'
import { ContentContainer } from '../../../../styles/GlobalStyling'
import { ContentBoxWrapper } from '../../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../../components/1__Molecules/ContentBox/ContentBox'
import ChannelList from '../../../components/2__Compounds/ChannelList/ChannelList'
import VideoList from '../../../components/2__Compounds/VideoList/VideoList'
import { useSelector } from 'react-redux'
import { getAllVideos, getSuccessfulChannels } from '../../../../store/channel/channel.selector'
import FacesBarChart from '../../../components/2__Compounds/FacesBarChart/FacesBarChart'
import TitleBarChart from '../../../components/2__Compounds/TitleBarChart/TitleBarChart'
import Button from '../../../components/0__Atoms/Button/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useHistory } from 'react-router'
import { BoxButtonBar } from './ErfolgsStying'
import { getFetching } from '../../../../store/ui/ui.selector'
import ClickbaitObjectBoxPlot from '../../../components/2__Compounds/ClickbaitObjectBoxPlot/ClickbaitObjectBoxPlot'

const Erfolgsübersicht: React.FC = () => {
  const history = useHistory()
  const channels = useSelector(getSuccessfulChannels)
  const videos = useSelector(getAllVideos)
  const fetching = useSelector(getFetching)

  const buttonTitles = (
    <BoxButtonBar>
      <Button
        endIcon={<ArrowForwardIcon />}
        color='secondary'
        variant='contained'
        onClick={() => history.push('/success/titles')}
      >
        Titelanalyse im Detail
      </Button>
    </BoxButtonBar>
  )

  const buttonFaces = (
    <BoxButtonBar>
      <Button
        endIcon={<ArrowForwardIcon />}
        color='secondary'
        variant='contained'
        onClick={() => history.push('/success/faces')}
      >
        Gesichtsanalyse im Detail
      </Button>
    </BoxButtonBar>
  )

  const buttonObjects = (
    <BoxButtonBar>
      <Button
        endIcon={<ArrowForwardIcon />}
        color='secondary'
        variant='contained'
        onClick={() => history.push('/success/objects')}
      >
        Clickbait-Objekt Analyse im Detail
      </Button>
    </BoxButtonBar>
  )

  return (
    <>
      <SubHeader>
        <Headline>Erfolgsfaktoren - Übersicht</Headline>
      </SubHeader>
      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Aktuell besonders erfolgreiche Kanäle'>
            <ChannelList linkOverview channels={channels} />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Aktuell besonders erfolgreiche Videos'>
            <VideoList videos={videos.sort((a, b) => b.statistics[0].success_factor - a.statistics[0].success_factor).slice(0, 3)} all />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Titelanalyse' subtitle={videos.length + ' Titel analysiert'}>
            <TitleBarChart global />
            {!fetching && buttonTitles}
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Gesichter auf Thumbnails' subtitle={videos.length + ' Thumbnails analysiert'}>
            <FacesBarChart global />
            {!fetching && buttonFaces}
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Clickbait Objekte auf Thumbnails' subtitle={videos.length + ' Thumbnails analysiert'}>
            <ClickbaitObjectBoxPlot global />
            {!fetching && buttonObjects}
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Erfolgsübersicht
