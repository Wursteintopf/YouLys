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
import { getCurrentVideo, getNewestVideoStatistic } from '../../../store/video/video.selector'
import Progress from '../../components/Progress/Progress'
import {
  ChannelListClicks,
  ChannelListSmallText,
  ChannelListSubs,
  ChannelListSuccess,
} from '../Kanalliste/KanallisteStyling'
import numberFormatter from '../../../util/numberFormatter'
import ToolTip from '../../components/ToolTip/ToolTip'
import {
  ChannelDetailOverview,
  ChannelDetailsLink,
  ChannelDetailsName, ChannelHeader, VideoDetailsProfilePicture,
} from '../Kanaldetailseite/KanaldetailseiteStyling'
import moment from 'moment'
import LineChart from '../../components/LineChart/LineChart'
import themeVariables from '../../../styles/themeVariables'

const Videodetailseite: React.FC = () => {
  const from = useSelector(getFrom)
  const to = useSelector(getTo)
  const fetching = useSelector(getFetching)
  const video = useSelector(getCurrentVideo)
  const stat = useSelector(getNewestVideoStatistic)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchCurrentVideo(window.location.pathname.split('/')[2]))
  }, [from, to])

  if (video.video_id === '' || !stat) return <Progress />

  return (
    <>
      <SubHeader>
        <ChannelHeader>
          <VideoDetailsProfilePicture>
            <img src={stat.video_thumbnail.thumbnail} />
          </VideoDetailsProfilePicture>
          <ChannelDetailsName>
            <Headline>{stat.video_meta.title}</Headline>
            <ChannelDetailsLink href={'https://www.youtube.com/watch?v=' + video.video_id}>Zum YouTube Video</ChannelDetailsLink>
          </ChannelDetailsName>
        </ChannelHeader>
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
                {numberFormatter(stat.views, 1)}
                <ChannelListSmallText>Aufrufe</ChannelListSmallText>
              </ChannelListClicks>
              <ChannelListSuccess>
                {stat.success_factor}
                <ChannelListSmallText>Erfolgsfaktor</ChannelListSmallText>
                <ToolTip
                  offSetX={65}
                >
                  <Headline>Erfolgsfaktor</Headline>
                  <p>
                    Der YouLys Erfolgsfaktor berechnet sich aus dem Wachstum von Aufrufen, Kommentaren und Likes.
                    Dabei werden immer das neuste Video mit den 50 vorhergehenden Videos verglichen.
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
                    values={video.statistics.map(stat => {
                      return {
                        value: stat.views,
                        timestamp: moment(stat.timestamp).startOf('day').toDate(),
                      }
                    })}
                  />
            }
          </ContentBox>
          <ContentBox title='Neue Aufrufe'>
            {
              fetching
                ? <Progress />
                : <LineChart
                    values={video.statistics.map((stat, index) => {
                      let views = 0
                      if (!stat.views || index === 0 || !video.statistics || !video.statistics[index - 1].views) views = 0
                      else views = stat.views - video.statistics[index - 1].views
                      return {
                        value: views,
                        timestamp: moment(stat.timestamp).startOf('day').toDate(),
                      }
                    })}
                  />
            }
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Analysiertes Thumbnail'>
            <svg viewBox='0 0 1280 720'>
              <image href={stat.video_thumbnail.thumbnail} />
              {
                stat.video_thumbnail.faces.map((face, index) => {
                  return (
                    <g key={index}>
                      <rect x={face.x} y={face.y} width={face.width} height={face.height} fill='none' strokeWidth={5} stroke={themeVariables.colorBlue} />
                      <g transform={`translate(${face.x},${face.y + face.height})`}>
                        <rect x={-2.5} y={0} width={270} height={70} fill={themeVariables.colorBlue} />
                        <text x={7} y={20} fill={themeVariables.colorWhite} fontWeight={600}>Gender:</text>
                        <text x={95} y={20} fill={themeVariables.colorWhite}>{face.gender === 'male' ? 'männlich' : 'weiblich'} ({(face.gender_probability * 100).toFixed(0)}% sicher)</text>
                        <text x={7} y={40} fill={themeVariables.colorWhite} fontWeight={600}>Alter:</text>
                        <text x={95} y={40} fill={themeVariables.colorWhite}>ca. {face.age.toFixed(0)}</text>
                        <text x={7} y={60} fill={themeVariables.colorWhite} fontWeight={600}>Stimmung:</text>
                        <text x={95} y={60} fill={themeVariables.colorWhite}>{face.expression}</text>
                      </g>
                    </g>
                  )
                })
              }
            </svg>
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Videodetailseite
