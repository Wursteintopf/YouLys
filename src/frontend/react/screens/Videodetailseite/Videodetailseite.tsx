import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import SubHeader from '../../components/SubHeader/SubHeader'
import { Headline } from '../../components/Headline/Headline'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/ContentBox/ContentBox'
import { useDispatch, useSelector } from 'react-redux'
import { getFetching, getFrom, getTo } from '../../../store/ui/ui.selector'
import { setFetching } from '../../../store/ui/ui.actions'
import { fetchCurrentVideo } from '../../../store/video/video.actions'
import { getCurrentVideo } from '../../../store/video/video.selector'
import Progress from '../../components/Progress/Progress'
import {
  ChannelListClicks,
  ChannelListSmallText,
  ChannelListSubs,
  ChannelListSuccess,
} from '../Kanalliste/KanallisteStyling'
import numberFormatter from '../../../util/numberFormatter'
import ToolTip from '../../components/ToolTip/ToolTip'
import { ChannelDetailOverview } from '../Kanaldetailseite/KanaldetailseiteStyling'
import moment from 'moment'
import LineChart from '../../components/LineChart/LineChart'

const Videodetailseite: React.FC = () => {
  const from = useSelector(getFrom)
  const to = useSelector(getTo)
  const fetching = useSelector(getFetching)
  const video = useSelector(getCurrentVideo)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchCurrentVideo(window.location.pathname.split('/')[2]))
  }, [from, to])

  if (video.video_id === '' || !video.statistics) return <Progress />

  return (
    <>
      <SubHeader>
        <Headline>
          {video.statistics[0].title}
        </Headline>
      </SubHeader>

      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Übersicht'>
            <ChannelDetailOverview>
              <ChannelListSubs>
                {moment(video.upload_time).format('DD.MM.YYYY')}
                <ChannelListSmallText>Veröffentlicht</ChannelListSmallText>
              </ChannelListSubs>
              <ChannelListClicks>
                {numberFormatter(video.statistics[0].views, 1)}
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
                    Dabei werden immer das neuste Video mit den 30 vorhergehenden Videos verglichen.
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
                    values={video.statistics.map(stat => stat.views ? stat.views : 0)}
                    timeValues={video.statistics.map(s => moment(s.timestamp).startOf('day').toDate())}
                  />
            }
          </ContentBox>
          <ContentBox title='Neue Aufrufe'>
            Lorem
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Videodetailseite
