import React from 'react'
import {
  BreadCrumb,
  BreadCrumbLink,
  SubHeaderContent,
  SubHeaderDropdownWrapper,
  SubHeaderStyled,
} from './SubHeaderStyling'
import { ContentContainer } from '../../../../styles/GlobalStyling'
import TimePicker from '../../1__Molecules/TimePicker/TimePicker'
import { useSelector } from 'react-redux'
import { getCurrentChannel, getCurrentVideo } from '../../../../store/channel/channel.selector'
import clampByLength from '../../../../util/ClampByLength'
import { getFetching } from '../../../../store/ui/ui.selector'

const SubHeader: React.FC = props => {
  const channel = useSelector(getCurrentChannel)
  const video = useSelector(getCurrentVideo)
  const fetching = useSelector(getFetching)

  if (fetching) return <></>

  const path = window.location.pathname.split('/')[1]
  const pathSecond = window.location.pathname.split('/')[2]

  const renderBreadcrumb = () => {
    switch (path) {
      case 'channeldetails':
        return <><BreadCrumbLink to='/channels'>Alle Kanäle</BreadCrumbLink> / {channel.statistics[0].channel_meta.username}</>
      case 'videos':
        return <><BreadCrumbLink to='/channels'>Alle Kanäle</BreadCrumbLink> / <BreadCrumbLink to={'/channeldetails/' + channel.channel_id}>{channel.statistics[0].channel_meta.username}</BreadCrumbLink> / Videos</>
      case 'videodetails':
        return <><BreadCrumbLink to='/channels'>Alle Kanäle</BreadCrumbLink> / <BreadCrumbLink to={'/channeldetails/' + channel.channel_id}>{channel.statistics[0].channel_meta.username}</BreadCrumbLink> / <BreadCrumbLink to={'/videos/' + channel.channel_id}>Videos</BreadCrumbLink> / {clampByLength(video.statistics[0].video_meta.title, 30)}</>
      case 'success':
        switch (pathSecond) {
          case 'titles':
            return <><BreadCrumbLink to='/success'>Erfolgsfaktoren</BreadCrumbLink> / Titelanalyse</>
          case 'faces':
            return <><BreadCrumbLink to='/success'>Erfolgsfaktoren</BreadCrumbLink> / Gesichtsanalyse</>
          case 'objects':
            return <><BreadCrumbLink to='/success'>Erfolgsfaktoren</BreadCrumbLink> / Objektanalyse</>
          case 'colors':
            return <><BreadCrumbLink to='/success'>Erfolgsfaktoren</BreadCrumbLink> / Farbschema</>
        }
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
