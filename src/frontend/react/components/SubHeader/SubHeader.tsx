import React from 'react'
import {
  BreadCrumb,
  BreadCrumbLink,
  SubHeaderContent,
  SubHeaderDropdownWrapper,
  SubHeaderStyled,
} from './SubHeaderStyling'
import { ContentContainer } from '../../../styles/GlobalStyling'
import TimePicker from '../TimePicker/TimePicker'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { getCurrentChannel } from '../../../store/channel/channel.selector'
import { getCurrentVideo } from '../../../store/video/video.selector'
import clampByLength from '../../../util/clampByLength'
import { Link } from 'react-router-dom'

const SubHeader: React.FC = props => {
  const channel = useSelector(getCurrentChannel)
  const video = useSelector(getCurrentVideo)

  const path = window.location.pathname.split('/')[1]

  if (!channel.statistics[0]) return <></>

  const renderBreadcrumb = () => {
    switch (path) {
      case 'channeldetails':
        return <><BreadCrumbLink to='/channels'>Alle Kanäle</BreadCrumbLink> / {channel.statistics[0].channel_meta.username}</>
      case 'videos':
        return <><BreadCrumbLink to='/channels'>Alle Kanäle</BreadCrumbLink> / <BreadCrumbLink to={'/channeldetails/' + channel.channel_id}>{channel.statistics[0].channel_meta.username}</BreadCrumbLink> / Videos</>
      case 'videodetails':
        return <><BreadCrumbLink to='/channels'>Alle Kanäle</BreadCrumbLink> / <BreadCrumbLink to={'/channeldetails/' + channel.channel_id}>{channel.statistics[0].channel_meta.username}</BreadCrumbLink> / <BreadCrumbLink to={'/videos/' + channel.channel_id}>Videos</BreadCrumbLink> / {clampByLength(video.statistics[0].video_meta.title, 30)}</>
    }
  }

  return (
    <SubHeaderStyled>
      <ContentContainer>
        <SubHeaderContent>
          <BreadCrumb>
            {renderBreadcrumb()}
          </BreadCrumb>
          {props.children}
          <SubHeaderDropdownWrapper>
            <TimePicker />
          </SubHeaderDropdownWrapper>
        </SubHeaderContent>
      </ContentContainer>
    </SubHeaderStyled>
  )
}

export default SubHeader
