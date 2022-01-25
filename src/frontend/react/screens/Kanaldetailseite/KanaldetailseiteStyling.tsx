import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

export const ChannelHeader = styled.div`
  display: flex;
  align-items: center;
`

export const ChannelDetailsProfilePicture = styled.div`
  margin-right: ${themeVariables.spacingM}px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid ${themeVariables.colorLightGrey};
  }
`

export const VideoDetailsProfilePicture = styled.div`
  margin-right: ${themeVariables.spacingM}px;
  img {
    height: 50px;
  }
`

export const ChannelDetailsName = styled.div`
  
`

export const ChannelDetailsLink = styled.a`
  font-size: ${themeVariables.fontSizeSmall}px;
  color: ${themeVariables.colorBlue};
`

export const ChannelDetailOverview = styled.div`
  display: flex;
  align-items: center;
`

export const ChannelDetailOverviewContent = styled.div`
  margin-right: 200px;
  
  ${themeVariables.breakDesktop} {
    margin-right: 100px;
  }

  ${themeVariables.breakMobile} {
    margin-right: 30px;
  }
`

export const ChannelDetailOverviewSuccess = styled(ChannelDetailOverviewContent)`
  position: relative;
`
