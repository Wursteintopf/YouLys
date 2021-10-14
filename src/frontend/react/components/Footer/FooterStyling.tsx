import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

export const FooterStyled = styled.div`
  height: ${themeVariables.headerHeight}px;
  background-color: ${themeVariables.colorBlue};
  color: ${themeVariables.colorWhite};
  margin-top: auto;
`

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${themeVariables.headerHeight}px;
`

export const FooterMenuItem = styled.a`
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
