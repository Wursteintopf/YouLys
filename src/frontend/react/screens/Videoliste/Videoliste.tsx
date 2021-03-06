import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
import { useDispatch, useSelector } from 'react-redux'
import { getFetching, getFrom, getTo } from '../../../store/ui/ui.selector'
import { getCurrentChannel } from '../../../store/channel/channel.selector'
import { setFetching } from '../../../store/ui/ui.actions'
import { fetchCurrentChannel } from '../../../store/channel/channel.actions'
import Progress from '../../components/0__Atoms/Progress/Progress'
import {
  ChannelDetailsLink,
  ChannelDetailsName,
  ChannelDetailsProfilePicture,
  ChannelHeader,
} from '../Kanaldetailseite/KanaldetailseiteStyling'
import { Headline } from '../../components/0__Atoms/Headline/Headline'
import SubHeader from '../../components/2__Compounds/SubHeader/SubHeader'
import VideoList from '../../components/2__Compounds/VideoList/VideoList'

const Videoliste: React.FC = () => {
  const from = useSelector(getFrom)
  const to = useSelector(getTo)
  const fetching = useSelector(getFetching)
  const channel = useSelector(getCurrentChannel)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchCurrentChannel(window.location.pathname.split('/')[2]))
  }, [from, to])

  if (channel.channel_id === '' || !channel.statistics) return <Progress />

  return (
    <>
      <SubHeader>
        <ChannelHeader>
          <ChannelDetailsProfilePicture>
            <img src={channel.statistics[0].channel_meta.profile_picture} />
          </ChannelDetailsProfilePicture>
          <ChannelDetailsName>
            <Headline>{channel.statistics[0].channel_meta.username}</Headline>
            <ChannelDetailsLink href={'https://www.youtube.com/channel/' + channel.channel_id}>Zum Youtube Kanal</ChannelDetailsLink>
          </ChannelDetailsName>
        </ChannelHeader>
      </SubHeader>

      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Hochgeladene Videos im ausgew??hlten Zeitraum'>
            {(channel.videos && Object.keys(channel.videos).length > 0) ? <VideoList all videos={Object.keys(channel.videos).map(key => channel.videos[key])} /> : (fetching ? <Progress /> : 'Im ausgew??hlten Zeitraum wurden keine Videos ver??ffentlicht.')}
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Videoliste
