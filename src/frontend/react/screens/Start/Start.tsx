import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import HeroTeaser from './HeroTeaser/HeroTeaser'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
import { useDispatch, useSelector } from 'react-redux'
import { setFetching } from '../../../store/ui/ui.actions'
import { fetchVideos } from '../../../store/channel/channel.actions'
import FacesBarChart from '../../components/2__Compounds/FacesBarChart/FacesBarChart'
import { getFetching } from '../../../store/ui/ui.selector'
import { BoxButtonBar } from '../Erfolgsfaktoren/Unterseiten/ErfolgsStying'
import Button from '../../components/0__Atoms/Button/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useHistory } from 'react-router'
import { getAmountOfVideos, getSuccessfulChannels } from '../../../store/channel/channel.selector'
import ChannelList from '../../components/2__Compounds/ChannelList/ChannelList'

const Start: React.FC = () => {
  const dispatch = useDispatch()
  const fetching = useSelector(getFetching)
  const history = useHistory()
  const amount = useSelector(getAmountOfVideos)
  const channels = useSelector(getSuccessfulChannels)

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchVideos())
  }, [])

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

  return (
    <>
      <HeroTeaser />

      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Aktuell besonders erfolgreiche Kanäle'>
            <ChannelList linkOverview channels={channels} />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Erfolg von Gesichtern auf Thumbnails' subtitle={amount + ' Thumbnails analysiert'}>
            <FacesBarChart global />
            {!fetching && buttonFaces}
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Start
