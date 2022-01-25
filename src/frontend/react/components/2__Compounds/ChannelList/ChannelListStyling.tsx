import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'

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
  
  ${themeVariables.breakMobile} {
    flex-wrap: wrap;
  }
`

export const ChannelListProfilePicture = styled.div`
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 3px solid ${themeVariables.colorLightGrey};
  }
`

export const ChannelListMeta = styled.div`
  flex-basis: 60%;
  margin-left: ${themeVariables.spacingM}px;
  display: flex;
  align-items: center;
  
  ${themeVariables.breakTablet} {
    flex-basis: 35%;
    flex-direction: column;
    align-items: flex-start;
  }

  ${themeVariables.breakMobile} {
    flex-basis: 50%;
  }
`

export const ChannelListUsername = styled.div`
  flex-basis: 50%;
  font-weight: ${themeVariables.fontWeightBold};
`

export const ChannelListStat = styled.div`
  ${themeVariables.breakTablet} {
    display: flex;

    span {
      font-size: ${themeVariables.fontSizeSmall}px;
      padding-right: 5px;
    }
  }
`

export const ChannelListSubs = styled(ChannelListStat)`
  flex-basis: 25%;
`

export const ChannelListClicks = styled(ChannelListStat)`
  flex-basis: 25%;
`

export const ChannelListSuccess = styled(ChannelListStat)`
  flex-basis: 15%;
  position: relative;
`

export const ChannelListSmallText = styled.div`
  font-size: ${themeVariables.fontSizeSmall}px;
`

export const ChannelListDetailsButton = styled.div`
  margin-left: auto;

  ${themeVariables.breakMobile} {
    margin-top: ${themeVariables.spacingS}px;
  }
`
