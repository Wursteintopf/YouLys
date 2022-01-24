import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

export const VideoDetailOverview = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export const VideoOverviewElement = styled.div`
  position: relative;
  width: 80px;
  margin: ${themeVariables.spacingXS}px ${themeVariables.spacingL}px ${themeVariables.spacingXS}px 0;
`

export const ThumbnailWrapper = styled.div`
  svg {
    width: 50%;
  }
`
