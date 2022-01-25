import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'

export const VideoListStyled = styled.ul`
  margin: 0 ${themeVariables.spacingS}px;
  padding: 0;
  list-style: none;
`

export const VideoListEntry = styled.li`
  display: flex;
  border-bottom: 1px solid ${themeVariables.colorLightGrey};
  padding: ${themeVariables.spacingS}px 0;
  align-items: center;
  
  &:last-of-type {
    border-bottom: none;
  }

  ${themeVariables.breakMobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const VideoListThumbnail = styled.div`
  img {
    height: 80px;

    ${themeVariables.breakMobile} {
      height: initial;
      width: 100%;
    }
  }
`

export const VideoListMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin-left: ${themeVariables.spacingM}px;

  ${themeVariables.breakDesktop} {
    width: 55%;
    flex-direction: column;
    align-items: flex-start;
  }

  ${themeVariables.breakMobile} {
    width: 100%;
    margin-left: 0;
    margin-top: ${themeVariables.spacingS}px;
  }
`

export const VideoListTitle = styled.div`
  width: 60%;
  margin-right: ${themeVariables.spacingM}px;
  
  p {
    margin: 0;
    
    ${themeVariables.breakDesktop} {
      display: none;
    }
  }

  ${themeVariables.breakDesktop} {
    width: 100%;
  }
`

export const VideoStat = styled.div`
  ${themeVariables.breakDesktop} {
    display: flex;

    span {
      font-size: ${themeVariables.fontSizeSmall}px;
      padding-right: 5px;
    }
  }
`

export const VideoListViews = styled(VideoStat)`
`

export const VideoListSmallText = styled.div`
  font-size: ${themeVariables.fontSizeSmall}px;
`

export const VideoListSuccess = styled(VideoStat)`
  position: relative;
`

export const VideoListButton = styled.div`
  margin-left: auto;

  ${themeVariables.breakMobile} {
    margin-top: ${themeVariables.spacingS}px;
  }
`

export const AllVideosButton = styled.a`
  margin-top: ${themeVariables.spacingS}px;
  font-size: ${themeVariables.fontSizeRegular}px;
  font-weight: ${themeVariables.fontWeightBold};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  svg {
    margin-left: ${themeVariables.spacingS}px;
  }
`
