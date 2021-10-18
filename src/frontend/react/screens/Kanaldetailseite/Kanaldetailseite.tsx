import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import SubHeader from '../../components/SubHeader/SubHeader'
import { Headline } from '../../components/Headline/Headline'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/ContentBox/ContentBox'
import { useDispatch, useSelector } from 'react-redux'
import { getFetching, getFrom, getRange, getTo } from '../../../store/ui/ui.selector'
import { getCurrentChannel } from '../../../store/channel/channel.selector'
import Progress from '../../components/Progress/Progress'
import { fetchCurrentChannel } from '../../../store/channel/channel.actions'
import { ChannelDetailOverview, ChannelDetailsProfilePicture, ChannelHeader } from './KanaldetailseiteStyling'
import {
  ChannelListClicks,
  ChannelListSmallText,
  ChannelListSubs,
  ChannelListSuccess,
} from '../Kanalliste/KanallisteStyling'
import numberFormatter from '../../../util/numberFormatter'
import ToolTip from '../../components/ToolTip/ToolTip'
import LineChart from '../../components/LineChart/LineChart'
import moment from 'moment'
import { setFetching } from '../../../store/ui/ui.actions'

const Kanaldetailseite: React.FC = () => {
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
        <Headline>
          <ChannelHeader>
            <ChannelDetailsProfilePicture>
              <img src={channel.statistics[0].profile_picture} />
            </ChannelDetailsProfilePicture>
            {channel.statistics[0].username}
          </ChannelHeader>
        </Headline>
      </SubHeader>

      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Übersicht'>
            <ChannelDetailOverview>
              <ChannelListSubs>
                {numberFormatter(channel.statistics[0].subscriber_count, 1)}
                <ChannelListSmallText>Abonennten</ChannelListSmallText>
              </ChannelListSubs>
              <ChannelListClicks>
                {numberFormatter(channel.statistics[0].view_count, 1)}
                <ChannelListSmallText>Aufrufe</ChannelListSmallText>
              </ChannelListClicks>
              <ChannelListSuccess>
                A++
                <ChannelListSmallText>Erfolgsfaktor</ChannelListSmallText>
                <ToolTip
                  offSetX={65}
                >
                  <Headline>Erfolgsfaktor</Headline>
                  <p>
                    Der YouLys Erfolgsfaktor berechnet sich aus dem Wachstum von Aufrufen, Kommentaren und Likes.
                    Dabei werden immer das neuste Video mit den 30 vorhergehenden Videos verglichen. Der Erfolgsfaktor
                    eines ganzen Kanals ist dann wiederum der durchschnittliche Erfolgsfaktor der letzten 30 Videos.
                    <br /><br />
                    Für die genaue Berechnungsformel besuche gerne unsere Erklärseite.
                  </p>
                </ToolTip>
              </ChannelListSuccess>
            </ChannelDetailOverview>
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={2}>
          <ContentBox title='Aufrufe'>
            {
              fetching
                ? <Progress />
                : <LineChart
                    values={channel.statistics.map(stat => stat.view_count ? stat.view_count : 0)}
                    timeValues={channel.statistics.map(s => moment(s.timestamp).toDate())}
                  />
            }
          </ContentBox>
          <ContentBox title='Abonennten'>
            {
              fetching
                ? <Progress />
                : <LineChart
                    values={channel.statistics.map(stat => stat.subscriber_count ? stat.subscriber_count : 0)}
                    timeValues={channel.statistics.map(s => moment(s.timestamp).toDate())}
                  />
            }
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={2}>
          <ContentBox title='Neue Aufrufe'>
            {
              fetching
                ? <Progress />
                : <LineChart
                  values={channel.statistics.map((stat, index) => {
                    if (index === 0 || !stat.view_count || !channel.statistics || !channel.statistics[index - 1].view_count) return 0
                    // @ts-ignore
                    else return stat.view_count - channel.statistics[index - 1].view_count
                  })}
                  timeValues={channel.statistics.map(s => moment(s.timestamp).toDate())}
                />
            }
          </ContentBox>
          <ContentBox title='Neue Abonennten'>
            {
              fetching
                ? <Progress />
                : <LineChart
                  values={channel.statistics.map((stat, index) => {
                    if (index === 0 || !stat.subscriber_count || !channel.statistics || !channel.statistics[index - 1].subscriber_count) return 0
                    // @ts-ignore
                    else return stat.subscriber_count - channel.statistics[index - 1].subscriber_count
                  })}
                  timeValues={channel.statistics.map(s => moment(s.timestamp).toDate())}
                />
            }
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Kanaldetailseite
