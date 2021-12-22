import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'
import { Link } from 'react-router-dom'

export const SubHeaderStyled = styled.div`
  height: ${themeVariables.headerHeight}px;
  background-color: ${themeVariables.colorWhite};
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  position: relative;
`

export const SubHeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: ${themeVariables.headerHeight}px;
`

export const SubHeaderDropdownWrapper = styled.div`
  margin-left: auto;
`

export const BreadCrumb = styled.div`
  position: absolute;
  top: ${themeVariables.headerHeight + themeVariables.spacingM}px;
  font-size: ${themeVariables.fontSizeSmall}px;
`

export const BreadCrumbLink = styled(Link)`
  color: ${themeVariables.colorBlue};
`
