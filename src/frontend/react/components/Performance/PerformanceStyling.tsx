import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

export const PerformanceStyled = styled.div`
  display: flex;
  justify-content: space-between;
`

export const PerformanceBox = styled.div`
  flex-basis: 32%;
  border-right: 1px solid ${themeVariables.colorLightGrey};
  padding-right: 2%;
  
  &:last-of-type {
    border-right: none;
    padding-right: 0;
  }
`
