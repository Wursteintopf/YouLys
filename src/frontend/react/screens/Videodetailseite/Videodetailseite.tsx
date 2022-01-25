import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import SubHeader from '../../components/2__Compounds/SubHeader/SubHeader'
import { Headline } from '../../components/0__Atoms/Headline/Headline'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
import { useDispatch, useSelector } from 'react-redux'
import { getFetching, getFrom, getTo } from '../../../store/ui/ui.selector'
import { setFetching } from '../../../store/ui/ui.actions'
import { fetchCurrentVideo } from '../../../store/channel/channel.actions'
import { getCurrentVideo, getNewestVideoStatistic } from '../../../store/channel/channel.selector'
import Progress from '../../components/0__Atoms/Progress/Progress'
import numberFormatter from '../../../util/numberFormatter'
import ToolTip from '../../components/0__Atoms/ToolTip/ToolTip'
import {
  ChannelDetailsLink,
  ChannelDetailsName, ChannelHeader, VideoDetailsProfilePicture,
} from '../Kanaldetailseite/KanaldetailseiteStyling'
import moment from 'moment'
import LineChart from '../../components/0__Atoms/LineChart/LineChart'
import themeVariables from '../../../styles/themeVariables'
import VideoPerformance from '../../components/2__Compounds/VideoPerformance/VideoPerformance'
import { VideoDetailOverview, VideoOverviewElement } from './VideodetailseiteStyling'
import SingleTitleAnalysis from '../../components/1__Molecules/SingleTitleAnalysis/SingleTitleAnalysis'
import { ChannelListSmallText } from '../../components/2__Compounds/ChannelList/ChannelListStyling'
import { isBigFace } from '../../../util/CalculateFaceSuccess'
import clampByLength from '../../../util/ClampByLength'
import { useWindowWidth } from '../../../util/Hooks'

const Videodetailseite: React.FC = () => {
  const windowWith = useWindowWidth()
  const titleLength = windowWith > 1200 ? 80 : (windowWith > 1000 ? 50 : (windowWith > 800 ? 40 : (windowWith > 600 ? 30 : (windowWith > 400 ? 20 : 15))))

  const from = useSelector(getFrom)
  const to = useSelector(getTo)
  const fetching = useSelector(getFetching)
  const video = useSelector(getCurrentVideo)
  const stat = useSelector(getNewestVideoStatistic)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchCurrentVideo({ channelId: window.location.pathname.split('/')[2], videoId: window.location.pathname.split('/')[3] }))
  }, [from, to])

  if (video.video_id === '') return <Progress />

  return (
    <>
      <SubHeader>
        <ChannelHeader>
          <VideoDetailsProfilePicture>
            <img src={stat.video_thumbnail.thumbnail} />
          </VideoDetailsProfilePicture>
          <ChannelDetailsName>
            <Headline>{clampByLength(stat.video_meta.title, titleLength)}</Headline>
            <ChannelDetailsLink href={'https://www.youtube.com/watch?v=' + video.video_id}>Zum Video</ChannelDetailsLink>
          </ChannelDetailsName>
        </ChannelHeader>
      </SubHeader>

      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Übersicht'>
            <VideoDetailOverview>
              <VideoOverviewElement>
                {moment(video.upload_time).format('DD.MM.YYYY')}
                <ChannelListSmallText>Veröffentlicht</ChannelListSmallText>
              </VideoOverviewElement>
              <VideoOverviewElement>
                {numberFormatter(stat.views, 1)}
                <ChannelListSmallText>Aufrufe</ChannelListSmallText>
              </VideoOverviewElement>
              <VideoOverviewElement>
                {numberFormatter(stat.commentCount, 0)}
                <ChannelListSmallText>Kommentare</ChannelListSmallText>
              </VideoOverviewElement>
              <VideoOverviewElement>
                {numberFormatter(stat.likes, 1)}
                <ChannelListSmallText>Likes/Dislikes</ChannelListSmallText>
              </VideoOverviewElement>
              <VideoOverviewElement>
                {stat.success_factor.toFixed(2)}
                <ChannelListSmallText>Erfolgswert</ChannelListSmallText>
                <ToolTip offSetX={-15}>
                  <Headline>Erfolgswert</Headline>
                  <p>
                    Der YouLys Erfolgswert berechnet sich aus dem Wachstum von Aufrufen, Kommentaren und Likes.
                    Dabei wird jedes Video immer mit den 50 vorhergehenden Videos verglichen.
                    <br /><br />
                    Für die genaue Berechnungsformel besuche gerne unsere Erklärseite.
                  </p>
                </ToolTip>
              </VideoOverviewElement>
            </VideoDetailOverview>
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Performance im Vergleich zum Kanaldurchschnitt'>
            <VideoPerformance />
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
                    values={video.statistics.reverse().map((stat, index) => {
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

        <ContentBoxWrapper amountOfChildren={2}>
          <SingleTitleAnalysis title={stat.video_meta.title} />
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Gesichtsanalyse auf dem Thumbnail'>
            <svg viewBox='0 0 1280 720'>
              <image href={stat.video_thumbnail.thumbnail} />
              {
                stat.video_thumbnail.faces.map((face, index) => {
                  return (
                    <g key={index}>
                      <rect x={face.x} y={face.y} width={face.width} height={face.height} fill='none' strokeWidth={5} stroke={themeVariables.colorBlue} />
                      <g transform={`translate(${face.x},${face.y + face.height})`}>
                        <rect x={-2.5} y={0} width={270} height={90} fill={themeVariables.colorBlue} />
                        <text x={7} y={20} fill={themeVariables.colorWhite} fontWeight={600}>Gender:</text>
                        <text x={95} y={20} fill={themeVariables.colorWhite}>{face.gender === 'male' ? 'männlich' : 'weiblich'} ({(face.gender_probability * 100).toFixed(0)}% sicher)</text>
                        <text x={7} y={40} fill={themeVariables.colorWhite} fontWeight={600}>Alter:</text>
                        <text x={95} y={40} fill={themeVariables.colorWhite}>ca. {face.age.toFixed(0)}</text>
                        <text x={7} y={60} fill={themeVariables.colorWhite} fontWeight={600}>Stimmung:</text>
                        <text x={95} y={60} fill={themeVariables.colorWhite}>{face.expression}</text>
                        <text x={7} y={80} fill={themeVariables.colorWhite} fontWeight={600}>Größe:</text>
                        <text x={95} y={80} fill={themeVariables.colorWhite}>{isBigFace(face) ? 'groß' : 'klein'}</text>
                      </g>
                    </g>
                  )
                })
              }
            </svg>
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Clickbait Objekte auf dem Thumbnail'>
            <svg viewBox='0 0 1280 720'>
              <image href={stat.video_thumbnail.thumbnail} />
              {
                stat.video_thumbnail.clickbait_objects.map((co, index) => {
                  return (
                    <g key={index}>
                      <rect x={co.cx} y={co.cy} width={co.cwidth} height={co.cheight} fill='none' strokeWidth={5} stroke={themeVariables.colorBlue} />
                      <g transform={`translate(${co.cx},${co.cy + co.cheight})`}>
                        <rect x={-2.5} y={0} width={170} height={50} fill={themeVariables.colorBlue} />
                        <text x={7} y={20} fill={themeVariables.colorWhite} fontWeight={600}>Objekt:</text>
                        <text x={95} y={20} fill={themeVariables.colorWhite}>{co.type === 'circle' ? 'Kreis' : (co.type === 'arrow' ? 'Pfeil' : 'Emoji')}</text>
                        <text x={7} y={40} fill={themeVariables.colorWhite} fontWeight={600}>Sicherheit:</text>
                        <text x={95} y={40} fill={themeVariables.colorWhite}>{(co.confidence * 100).toFixed(2)} %</text>
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
