import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { getFetching } from '../../../store/ui/ui.selector'
import { getChannels } from '../../../store/channel/channel.selector'
import { fetchChannels } from '../../../store/channel/channel.actions'
import { setFetching } from '../../../store/ui/ui.actions'
import Progress from '../../components/0__Atoms/Progress/Progress'
import { useHistory } from 'react-router'
import ChannelList from '../../components/2__Compounds/ChannelList/ChannelList'

const Kanalliste: React.FC = () => {
  const fetching = useSelector(getFetching)
  const channels = useSelector(getChannels)
  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchChannels())
  }, [])

  if (fetching || channels.length === 0) return <Progress />

  return (
    <ContentContainer>
      <ContentBoxWrapper amountOfChildren={1}>
        <ContentBox title='Kanäle'>
          <ChannelList channels={channels.sort((a, b) => b.statistics[0].subscriber_count - a.statistics[0].subscriber_count)} />
        </ContentBox>
      </ContentBoxWrapper>
    </ContentContainer>
  )
}

export default Kanalliste
