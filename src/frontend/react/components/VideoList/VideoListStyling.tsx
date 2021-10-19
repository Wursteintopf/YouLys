import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

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
`

export const VideoListThumbnail = styled.div`
  flex-basis: 15%;
  
  img {
    height: 80px;
  }
`

export const VideoListTitle = styled.div`
  flex-basis: 45%;
  padding-right: ${themeVariables.spacingM}px;
  
  p {
    margin: 0;
  }
`

export const VideoListViews = styled.div`
  flex-basis: 15%;
`

export const VideoListSmallText = styled.div`
  font-size: ${themeVariables.fontSizeSmall}px;
`

export const VideoListSuccess = styled.div`
  flex-basis: 15%;
`

export const VideoListButton = styled.div`
  margin-left: auto;
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
