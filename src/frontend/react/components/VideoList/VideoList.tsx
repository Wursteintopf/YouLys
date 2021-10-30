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
import { getCurrentChannel } from '../../../store/channel/channel.selector'

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
                {video.statistics[0].success_factor}
                <VideoListSmallText>Erfolgsfaktor</VideoListSmallText>
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
