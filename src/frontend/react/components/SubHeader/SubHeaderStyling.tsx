import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

export const SubHeaderStyled = styled.div`
  height: ${themeVariables.headerHeight}px;
  background-color: ${themeVariables.colorWhite};
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2);
`

export const SubHeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: ${themeVariables.headerHeight}px;
`

export const SubHeaderDropdownWrapper = styled.div`
  margin-left: auto;
`
