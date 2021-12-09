import React from 'react'
import {
  AllVideosButton,
  VideoListButton,
  VideoListEntry,
  VideoListSmallText,
  VideoListStyled, VideoListSuccess,
  VideoListThumbnail,
  VideoListTitle,
  VideoListViews,
} from './VideoListStyling'
import { VideoInterface } from '../../../../shared/Domain/Model/VideoInterface'
import numberFormatter from '../../../util/numberFormatter'
import clampByLength from '../../../util/clampByLength'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Button from '../Button/Button'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { getCurrentChannel, getNewestChannelStatistic } from '../../../store/channel/channel.selector'
import { Headline } from '../Headline/Headline'
import ToolTip from '../ToolTip/ToolTip'

interface VideoListProps {
 videos: VideoInterface[]
  all: boolean
}

const VideoList: React.FC<VideoListProps> = (props) => {
  const history = useHistory()
  const currentChannel = useSelector(getCurrentChannel)

  return (
    <VideoListStyled>
      {
        props.videos.filter(e => e.statistics.length > 0).map((video, index) => {
          return (
            <VideoListEntry key={index}>
              <VideoListThumbnail>
                <img src={video.statistics[0].video_thumbnail.thumbnail} />
              </VideoListThumbnail>
              <VideoListTitle>
                <b>{clampByLength(video.statistics[0].video_meta.title, 50)}</b>
                <p>{clampByLength(video.statistics[0].video_meta.description, 80)}</p>
              </VideoListTitle>
              <VideoListViews>
                {numberFormatter(video.statistics[0].views, 1)}
                <VideoListSmallText>Aufrufe</VideoListSmallText>
              </VideoListViews>
              <VideoListSuccess>
                {video.statistics[0].success_factor ? video.statistics[0].success_factor.toFixed(2) : 0}
                <VideoListSmallText>Erfolgswert</VideoListSmallText>
                <ToolTip
                  offSetX={65}
                >
                  <Headline>Erfolgswert</Headline>
                  <p>
                    Der YouLys Erfolgswert berechnet sich aus dem Wachstum von Aufrufen, Kommentaren und Likes.
                    Dabei wird jedes Video immer mit den 50 vorhergehenden Videos verglichen.
                    <br /><br />
                    Für die genaue Berechnungsformel besuche gerne unsere Erklärseite.
                  </p>
                </ToolTip>
              </VideoListSuccess>
              <VideoListButton>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  color='secondary'
                  variant='contained'
                  onClick={() => history.push('/videodetails/' + video.video_id)}
                >
                  Details
                </Button>
              </VideoListButton>
            </VideoListEntry>
          )
        })
      }
      {
        !props.all
          ? (
            <VideoListEntry>
              <AllVideosButton
                onClick={() => history.push('/videos/' + currentChannel.channel_id)}
              >
                Alle Videos
                <ArrowForwardIcon />
              </AllVideosButton>
            </VideoListEntry>
            )
          : ''
      }
    </VideoListStyled>
  )
}

export default VideoList
