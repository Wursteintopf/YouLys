import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import SubHeader from '../../components/SubHeader/SubHeader'
import { Headline } from '../../components/Headline/Headline'
import { useDispatch } from 'react-redux'
import { setFetching } from '../../../store/ui/ui.actions'
import { fetchVideos } from '../../../store/channel/channel.actions'
import GlobalFacesOnThumbnails from './GlobalFacesOnThumbnails'
import GlobalTitleAnalysis from './GlobalTitleAnalysis'

const Erfolgsfaktoren: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchVideos())
  }, [])

  return (
    <>
      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <GlobalTitleAnalysis />
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <GlobalFacesOnThumbnails />
        </ContentBoxWrapper>
      </ContentContainer>
    </>

  )
}

export default Erfolgsfaktoren
