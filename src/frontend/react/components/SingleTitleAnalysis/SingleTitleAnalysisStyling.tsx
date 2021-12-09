import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

export const TitleChecklist = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const TitleChecklistItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: ${themeVariables.spacingS}px;
  
  div {
    margin-right: ${themeVariables.spacingM}px;
  }
`
