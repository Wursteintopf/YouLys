import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'

export const ContentBoxStyled = styled.div`
  padding-right: ${themeVariables.spacingM}px;
  
  &:last-of-type {
    padding-right: 0;
  }
`

export const ContentBoxDivider = styled.div`
  flex-basis: 50%;
  padding-left: ${themeVariables.spacingM}px;
  
  &:first-of-type {
    padding-left: 0;
    padding-right: ${themeVariables.spacingM}px;
    border-right: 1px solid ${themeVariables.colorLightGrey};
  }
`

export const ContentBoxDividerWrapper = styled.div`
  display: flex;
`
