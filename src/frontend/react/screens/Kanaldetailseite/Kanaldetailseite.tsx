import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import SubHeader from '../../components/SubHeader/SubHeader'
import { Headline } from '../../components/Headline/Headline'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/ContentBox/ContentBox'
import { useDispatch, useSelector } from 'react-redux'
import { getFetching, getFrom, getTo } from '../../../store/ui/ui.selector'
import {
  getCurrentChannel, getCurrentChannelFaceMaxAmount, getCurrentChannelFaceMaxSuccess, getCurrentChannelFaceSuccess,
  getCurrentChannelSuccessResults,
  getNewestChannelStatistic,
} from '../../../store/channel/channel.selector'
import Progress from '../../components/Progress/Progress'
import { fetchCurrentChannel } from '../../../store/channel/channel.actions'
import {
  ChannelDetailOverview, ChannelDetailsLink, ChannelDetailsName,
  ChannelDetailsProfilePicture,
  ChannelHeader,
} from './KanaldetailseiteStyling'
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
import VideoList from '../../components/VideoList/VideoList'
import FacesOnThumbnails from '../../components/FacesOnThumbnails/FacesOnThumbnails'

const Kanaldetailseite: React.FC = () => {
  const from = useSelector(getFrom)
  const to = useSelector(getTo)
  const fetching = useSelector(getFetching)
  const channel = useSelector(getCurrentChannel)
  const stat = useSelector(getNewestChannelStatistic)
  const success = useSelector(getCurrentChannelSuccessResults)
  const maxSuccessFaces = useSelector(getCurrentChannelFaceMaxSuccess)
  const maxAmountFaces = useSelector(getCurrentChannelFaceMaxAmount)

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
              <ChannelListSubs>
                {numberFormatter(stat.subscriber_count, 1)}
                <ChannelListSmallText>Abonennten</ChannelListSmallText>
              </ChannelListSubs>
              <ChannelListClicks>
                {numberFormatter(stat.view_count, 1)}
                <ChannelListSmallText>Aufrufe</ChannelListSmallText>
              </ChannelListClicks>
              <ChannelListSuccess>
                {stat.success_factor ? stat.success_factor.toFixed(2) : 4}
                <ChannelListSmallText>Erfolgswert</ChannelListSmallText>
                <ToolTip
                  offSetX={65}
                >
                  <Headline>Erfolgswert</Headline>
                  <p>
                    Der YouLys Erfolgswert berechnet sich aus dem Wachstum von Aufrufen, Kommentaren und Likes.
                    Dabei werden immer das neuste Video mit den 50 vorhergehenden Videos verglichen. Der Erfolgsfaktor
                    eines ganzen Kanals ist dann wiederum der durchschnittliche Erfolgsfaktor der letzten 50 Videos.
                    <br /><br />
                    Für die genaue Berechnungsformel besuche gerne unsere Erklärseite.
                  </p>
                </ToolTip>
              </ChannelListSuccess>
            </ChannelDetailOverview>
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Neue Videos'>
            {(channel.videos && channel.videos.length > 0) ? <VideoList all={false} videos={channel.videos.slice(0, 3)} /> : 'Der Kanal hat im gewählten Zeitraum keine Videos veröffentlicht.'}
          </ContentBox>
        </ContentBoxWrapper>

        <FacesOnThumbnails success={success} maxAmountFaces={maxAmountFaces} maxSuccessFaces={maxSuccessFaces} />

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
