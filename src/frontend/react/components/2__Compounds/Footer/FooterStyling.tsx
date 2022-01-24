import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'

export const FooterStyled = styled.div`
  color: ${themeVariables.colorWhite};
  margin-top: auto;
  padding-top: ${themeVariables.spacingL}px;
  overflow: hidden;
`

export const FooterWrapper = styled.div`
  background-color: ${themeVariables.colorBlue};
`

export const FooterContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 25px 0;
  
  ${themeVariables.breakMobile} {
    flex-direction: column;
  }
`

export const FooterMenuItem = styled.a`
  margin-right: ${themeVariables.spacingXL}px;
  cursor: pointer;
  position: relative;
  width: fit-content;

  ${themeVariables.breakMobile} {
    margin-bottom: ${themeVariables.spacingS}px;
    
    &:last-of-type {
      margin-bottom: 0;
    }
  }

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
