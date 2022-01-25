import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'

export const HeaderStyled = styled.div`
  height: ${themeVariables.headerHeight}px;
  background-color: ${themeVariables.colorBlue};
  color: ${themeVariables.colorWhite};
`

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${themeVariables.headerHeight}px;

  ${themeVariables.breakMobile} {
    justify-content: space-between;
  }
`

export const LogoContainer = styled.div`
  margin-right: ${themeVariables.spacingXL}px;
  font-size: ${themeVariables.fontSizeHeadings}px;
  font-weight: ${themeVariables.fontWeightBold};
  cursor: pointer;
`

export const DesktopMenu = styled.div`
  display: flex;
  
  ${themeVariables.breakMobile} {
    display: none;
  }
`

export const MobileMenu = styled.div`
  display: none;
  position: relative;

  ${themeVariables.breakMobile} {
    display: initial;
  }
`

export const MobileMenuOpen = styled.div<{ open: boolean }>`
  background-color: ${themeVariables.greyOpague};
  position: absolute;
  top: 60px;
  right: -4vw;
  width: 100vw;
  z-index: 999999;
  color: ${themeVariables.colorBlack};
  transition: opacity 0.5s, visibility 0.5s, min-height 0.3s, height 0.3s;
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  opacity: ${props => props.open ? '0.98' : '0'};
  min-height: ${props => props.open ? 'calc(100vh - 70px)' : '0'};
  height: ${props => props.open ? '100%' : '0'};
`

export const MobileMenuItem = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-bottom: 1px solid ${themeVariables.colorDarkGrey};
  font-size: ${themeVariables.fontSizeRegular}px;
  font-weight: ${themeVariables.fontWeightBold};
  text-transform: uppercase;
  cursor: pointer;
  
  &:hover {
    background-color: ${themeVariables.colorGrey};
  }
`

export const MobileMenuSubItem = styled(MobileMenuItem)`
  text-transform: initial;
  font-weight: initial;
`

export const MenuItem = styled.a`
  margin-right: ${themeVariables.spacingXL}px;
  height: ${themeVariables.headerHeight}px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
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
  }
  
  &:hover > div {
    visibility: visible;
    top: ${themeVariables.headerHeight}px;
    opacity: 1;
  }
`

export const SubMenu = styled.div`
  padding-top: 7px;
  visibility: hidden;
  position: absolute;
  width: 230px;
  top: 80px;
  left: 0;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.5s, top 0.4s ease-out;
  
  &:before {
    content: '';
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid ${themeVariables.colorBlue};
    position: absolute;
    top: 0px;
    left: 20px;
  }
`

export const SubMenuContent = styled.div`
  background-color: ${themeVariables.colorBlue};
  border-radius: 5px;
  padding: 7px;
`

export const SubMenuItem = styled.div`
  padding: 15px 15px;
  border-radius: 5px;
  
  &:hover {
    background-color: ${themeVariables.blueShades[0]};
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
