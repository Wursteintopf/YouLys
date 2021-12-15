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
import { useSelector } from 'react-redux'
import { getCurrentChannel, getCurrentVideo } from '../../../store/channel/channel.selector'
import clampByLength from '../../../util/clampByLength'

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
