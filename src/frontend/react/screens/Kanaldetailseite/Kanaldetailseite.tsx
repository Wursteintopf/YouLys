import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import SubHeader from '../../components/2__Compounds/SubHeader/SubHeader'
import { Headline } from '../../components/0__Atoms/Headline/Headline'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
import { useDispatch, useSelector } from 'react-redux'
import { getFetching, getFrom, getTo } from '../../../store/ui/ui.selector'
import {
  getCurrentChannel,
  getNewestChannelStatistic,
} from '../../../store/channel/channel.selector'
import Progress from '../../components/0__Atoms/Progress/Progress'
import { fetchCurrentChannel } from '../../../store/channel/channel.actions'
import {
  ChannelDetailOverview,
  ChannelDetailOverviewContent,
  ChannelDetailOverviewSuccess,
  ChannelDetailsLink,
  ChannelDetailsName,
  ChannelDetailsProfilePicture,
  ChannelHeader,
} from './KanaldetailseiteStyling'
import numberFormatter from '../../../util/numberFormatter'
import ToolTip from '../../components/0__Atoms/ToolTip/ToolTip'
import LineChart from '../../components/0__Atoms/LineChart/LineChart'
import moment from 'moment'
import { setFetching } from '../../../store/ui/ui.actions'
import VideoList from '../../components/2__Compounds/VideoList/VideoList'
import { ChannelListSmallText } from '../../components/2__Compounds/ChannelList/ChannelListStyling'
import FacesBarChart from '../../components/2__Compounds/FacesBarChart/FacesBarChart'
import TitleBarChart from '../../components/2__Compounds/TitleBarChart/TitleBarChart'
import FacesBoxPlot from '../../components/2__Compounds/FacesBoxPlot/FacesBoxPlot'

const Kanaldetailseite: React.FC = () => {
  const from = useSelector(getFrom)
  const to = useSelector(getTo)
  const fetching = useSelector(getFetching)
  const channel = useSelector(getCurrentChannel)
  const stat = useSelector(getNewestChannelStatistic)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchCurrentChannel(window.location.pathname.split('/')[2]))
  }, [from, to])

  if (channel.channel_id === '') return <Progress />

  return (
    <>
      <SubHeader>
        <ChannelHeader>
          <ChannelDetailsProfilePicture>
            <img src={stat.channel_meta.profile_picture} />
          </ChannelDetailsProfilePicture>
          <ChannelDetailsName>
            <Headline>{stat.channel_meta.username}</Headline>
            <ChannelDetailsLink href={'https://www.youtube.com/channel/' + channel.channel_id}>Zum Youtube Kanal</ChannelDetailsLink>
          </ChannelDetailsName>
        </ChannelHeader>
      </SubHeader>

      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Übersicht'>
            <ChannelDetailOverview>
              <ChannelDetailOverviewContent>
                {numberFormatter(stat.subscriber_count, 1)}
                <ChannelListSmallText>Abonennten</ChannelListSmallText>
              </ChannelDetailOverviewContent>
              <ChannelDetailOverviewContent>
                {numberFormatter(stat.view_count, 1)}
                <ChannelListSmallText>Aufrufe</ChannelListSmallText>
              </ChannelDetailOverviewContent>
              <ChannelDetailOverviewSuccess>
                {stat.channel_success_factor ? stat.channel_success_factor.toFixed(2) : 4}
                <ChannelListSmallText>Erfolgswert</ChannelListSmallText>
                <ToolTip>
                  <Headline>Erfolgswert</Headline>
                  <p>
                    Der YouLys Erfolgswert berechnet sich aus dem Wachstum von Aufrufen, Kommentaren und Likes.
                    Dabei werden immer das neuste Video mit den 50 vorhergehenden Videos verglichen. Der Erfolgsfaktor
                    eines ganzen Kanals ist dann wiederum der durchschnittliche Erfolgsfaktor der letzten 50 Videos.
                    <br /><br />
                    Für die genaue Berechnungsformel besuche gerne unsere Erklärseite.
                  </p>
                </ToolTip>
              </ChannelDetailOverviewSuccess>
            </ChannelDetailOverview>
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Neue Videos'>
            {(channel.videos && Object.keys(channel.videos).length > 0) ? <VideoList all={false} videos={Object.keys(channel.videos).map(key => channel.videos[key]).slice(0, 3)} /> : 'Der Kanal hat im gewählten Zeitraum keine Videos veröffentlicht.'}
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Titel Analyse' subtitle={Object.keys(channel.videos).length + ' Titel analysiert'}>
            <TitleBarChart />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Gesichter auf den Thumbnails' subtitle={Object.keys(channel.videos).length + ' Thumbnails analysiert'}>
            <FacesBarChart />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Gesichter - Boxplot Darstellung' subtitle={Object.keys(channel.videos).length + ' Thumbnails analysiert'}>
            <FacesBoxPlot />
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={2}>
          <ContentBox title='Aufrufe'>
            {
              fetching
                ? <Progress />
                : <LineChart
                    values={channel.statistics.map(stat => {
                      return {
                        value: stat.view_count,
                        timestamp: moment(stat.timestamp).startOf('day').toDate(),
                      }
                    })}
                  />
            }
          </ContentBox>
          <ContentBox title='Abonennten'>
            {
              fetching
                ? <Progress />
                : <LineChart
                    values={channel.statistics.map(stat => {
                      return {
                        value: stat.subscriber_count,
                        timestamp: moment(stat.timestamp).startOf('day').toDate(),
                      }
                    })}
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
                    values={channel.statistics.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()).map((stat, index) => {
                      let views = 0
                      if (index === 0 || !stat.view_count || !channel.statistics || !channel.statistics[index - 1].view_count) views = 0
                      else views = stat.view_count - channel.statistics[index - 1].view_count
                      return {
                        value: views,
                        timestamp: moment(stat.timestamp).startOf('day').toDate(),
                      }
                    })}
                  />
            }
          </ContentBox>
          <ContentBox title='Neue Abonennten'>
            {
              fetching
                ? <Progress />
                : <LineChart
                    values={channel.statistics.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()).map((stat, index) => {
                      let subs = 0
                      if (index === 0 || !stat.subscriber_count || !channel.statistics || !channel.statistics[index - 1].subscriber_count) subs = 0
                      else subs = stat.subscriber_count - channel.statistics[index - 1].subscriber_count
                      return {
                        value: subs,
                        timestamp: moment(stat.timestamp).startOf('day').toDate(),
                      }
                    })}
                  />
            }
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Kanaldetailseite
