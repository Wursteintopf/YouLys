import React from 'react'
import { ChannelInterface } from '../../../../../shared/Domain/Model/ChannelInterface'
import {
  ChannelListClicks, ChannelListDetailsButton,
  ChannelListEntry, ChannelListMeta,
  ChannelListProfilePicture, ChannelListSmallText, ChannelListStyled, ChannelListSubs, ChannelListSuccess,
  ChannelListUsername,
} from './ChannelListStyling'
import clampByLength from '../../../../util/ClampByLength'
import numberFormatter from '../../../../util/NumberFormatter'
import ToolTip from '../../0__Atoms/ToolTip/ToolTip'
import { Headline } from '../../0__Atoms/Headline/Headline'
import Button from '../../0__Atoms/Button/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useHistory } from 'react-router'
import { AllVideosButton, VideoListEntry } from '../VideoList/VideoListStyling'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'

interface KanallisteProps {
  channels: ChannelInterface[]
  linkOverview?: boolean
}

const ChannelList: React.FC<KanallisteProps> = (props) => {
  const history = useHistory()
  const fetching = useSelector(getFetching)

  if (fetching) return <Progress />

  return (
    <ChannelListStyled>
      {
        props.channels.map(channel => {
          channel.statistics = channel.statistics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

          return (
            <ChannelListEntry key={channel.channel_id}>
              <ChannelListProfilePicture>
                <img src={channel.statistics[0].channel_meta.profile_picture} />
              </ChannelListProfilePicture>

              <ChannelListMeta>
                <ChannelListUsername>
                  {clampByLength(channel.statistics[0].channel_meta.username, 40)}
                </ChannelListUsername>
                <ChannelListSubs>
                  <span>{numberFormatter(channel.statistics[0].subscriber_count, 1)}</span>
                  <ChannelListSmallText>Abonennten</ChannelListSmallText>
                </ChannelListSubs>
                <ChannelListClicks>
                  <span>{numberFormatter(channel.statistics[0].view_count, 1)}</span>
                  <ChannelListSmallText>Aufrufe</ChannelListSmallText>
                </ChannelListClicks>
                <ChannelListSuccess>
                  <span>{channel.statistics[0].channel_success_factor.toFixed(2)}</span>
                  <ChannelListSmallText>Erfolgsfaktor</ChannelListSmallText>
                  <ToolTip>
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
              </ChannelListMeta>

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
      {
        props.linkOverview
          ? (
            <ChannelListEntry>
              <AllVideosButton
                onClick={() => history.push('/channels')}
              >
                Alle Kanäle
                <ArrowForwardIcon />
              </AllVideosButton>
            </ChannelListEntry>
            )
          : ''
      }
    </ChannelListStyled>
  )
}

export default ChannelList
