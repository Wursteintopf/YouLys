import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'
import { TextField } from '@mui/material'

export const HeaderStyled = styled.div`
  height: ${themeVariables.headerHeight}px;
  background-color: ${themeVariables.colorBlue};
  color: ${themeVariables.colorWhite};
`

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${themeVariables.headerHeight}px;
`

export const LogoContainer = styled.div`
  margin-right: ${themeVariables.spacingXL}px;
  font-size: ${themeVariables.fontSizeHeadings}px;
  font-weight: ${themeVariables.fontWeightBold};
  cursor: pointer;
`

export const MenuItem = styled.a`
  margin-right: ${themeVariables.spacingXL}px;
  cursor: pointer;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: ${themeVariables.colorWhite};
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    transform-origin: 0 0;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`

export const SearchContainer = styled.div`
  margin-left: auto;
`

export const SearchTextField = styled(TextField)`
  border-color: ${themeVariables.colorWhite};
  color: ${themeVariables.colorWhite};
  
  > * {
    color: ${themeVariables.colorWhite} !important;
  }
  
  svg {
    color: ${themeVariables.colorWhite};
  }
  
  fieldset {
    border-color: ${themeVariables.colorWhite} !important;
    border-radius: 50px;
    
    &:hover {
      border-color: ${themeVariables.colorWhite};
    }
  }
`
