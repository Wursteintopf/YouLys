import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

export const ContentBoxStyled = styled.div`
  padding-right: ${themeVariables.spacingM}px;
  
  &:last-of-type {
    padding-right: 0;
  }
`
