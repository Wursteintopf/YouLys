import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

export const ChannelListStyled = styled.ul`
  list-style: none;
  margin: 0 ${themeVariables.spacingS}px;
  padding: 0;
`

export const ChannelListEntry = styled.li`
  padding: ${themeVariables.spacingS}px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${themeVariables.colorLightGrey};
  
  &:last-of-type {
    border-bottom: none;
  }
`

export const ChannelListProfilePicture = styled.div`
  flex-basis: 10%;
  
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 3px solid ${themeVariables.colorLightGrey};
  }
`

export const ChannelListUsername = styled.div`
  flex-basis: 30%;
  font-weight: ${themeVariables.fontWeightBold};
`

export const ChannelListSubs = styled.div`
  flex-basis: 15%;
`

export const ChannelListClicks = styled.div`
  flex-basis: 15%;
`

export const ChannelListSmallText = styled.div`
  font-size: ${themeVariables.fontSizeSmall}px;
`

export const ChannelListSuccess = styled.div`
  flex-basis: 15%;
  position: relative;
`

export const ChannelListDetailsButton = styled.div`
  margin-left: auto;
`
