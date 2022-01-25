import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'

export const ContentBoxStyled = styled.div`
  padding-right: ${themeVariables.spacingM}px;

  ${themeVariables.breakTablet} {
    padding-right: 0;
    padding-bottom: ${themeVariables.spacingL}px;
  }
  
  &:last-of-type {
    padding-right: 0;

    ${themeVariables.breakTablet} {
      padding-bottom: 0;
    }
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
  
  ${themeVariables.breakTablet} {
    flex-basis: 100%;
    padding-left: 0;
    
    &:first-of-type {
      padding-right: 0;
      border-right: none;
    }
  }
`

export const ContentBoxDividerWrapper = styled.div`
  display: flex;

  ${themeVariables.breakTablet} {
    flex-direction: column;
  }
`
