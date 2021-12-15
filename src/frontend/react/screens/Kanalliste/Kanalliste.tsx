import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import ContentBox from '../../components/ContentBox/ContentBox'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { getFetching } from '../../../store/ui/ui.selector'
import { getChannels } from '../../../store/channel/channel.selector'
import { fetchChannels } from '../../../store/channel/channel.actions'
import { setFetching } from '../../../store/ui/ui.actions'
import {
  ChannelListClicks, ChannelListDetailsButton,
  ChannelListEntry,
  ChannelListProfilePicture, ChannelListSmallText,
  ChannelListStyled, ChannelListSubs, ChannelListSuccess,
  ChannelListUsername,
} from './KanallisteStyling'
import Button from '../../components/Button/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import numberFormatter from '../../../util/numberFormatter'
import ToolTip from '../../components/ToolTip/ToolTip'
import { Headline } from '../../components/Headline/Headline'
import clampByLength from '../../../util/clampByLength'
import Progress from '../../components/Progress/Progress'
import { useHistory } from 'react-router'

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
          <ChannelListStyled>
            {
              channels.sort((a, b) => b.statistics[0].subscriber_count - a.statistics[0].subscriber_count).map(channel => {
                channel.statistics = channel.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

                return (
                  <ChannelListEntry key={channel.channel_id}>
                    <ChannelListProfilePicture>
                      <img src={channel.statistics[0].channel_meta.profile_picture} />
                    </ChannelListProfilePicture>
                    <ChannelListUsername>
                      {clampByLength(channel.statistics[0].channel_meta.username, 40)}
                    </ChannelListUsername>
                    <ChannelListSubs>
                      {numberFormatter(channel.statistics[0].subscriber_count, 1)}
                      <ChannelListSmallText>Abonennten</ChannelListSmallText>
                    </ChannelListSubs>
                    <ChannelListClicks>
                      {numberFormatter(channel.statistics[0].view_count, 1)}
                      <ChannelListSmallText>Aufrufe</ChannelListSmallText>
                    </ChannelListClicks>
                    <ChannelListSuccess>
                      {channel.statistics[0].channel_success_factor.toFixed(2)}
                      <ChannelListSmallText>Erfolgsfaktor</ChannelListSmallText>
                      <ToolTip
                        offSetX={65}
                      >
                        <Headline>Erfolgsfaktor</Headline>
                        <p>
                          Der YouLys Erfolgsfaktor berechnet sich aus dem Wachstum von Aufrufen, Kommentaren und Likes.
                          Dabei werden immer das neuste Video mit den 50 vorhergehenden Videos verglichen. Der Erfolgsfaktor
                          eines ganzen Kanals ist dann wiederum der durchschnittliche Erfolgsfaktor der letzten 50 Videos.
                          <br /><br />
                          Für die genaue Berechnungsformel besuche gerne unsere Erklärseite.
                        </p>
                      </ToolTip>
                    </ChannelListSuccess>
                    <ChannelListDetailsButton>
                      <Button
                        endIcon={<ArrowForwardIcon />}
                        color='secondary'
                        variant='contained'
                        onClick={() => {
                          history.push('/channeldetails/' + channel.channel_id)
                        }}
                      >
                        Details
                      </Button>
                    </ChannelListDetailsButton>
                  </ChannelListEntry>
                )
              })
            }
          </ChannelListStyled>
        </ContentBox>
      </ContentBoxWrapper>
    </ContentContainer>
  )
}

export default Kanalliste
