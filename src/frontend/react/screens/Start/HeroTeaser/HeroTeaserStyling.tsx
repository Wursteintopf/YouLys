import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'
import { css } from '@emotion/react'

export const HeroTeaserStyled = styled.div`
  background-color: ${themeVariables.colorBlack};
`

export const HeroTeaserContent = styled.div<{ image?: string }>`
  height: 500px;
  background-repeat: no-repeat;
  background-position-x: right -80px;
  background-position-y: center;
  background-size: contain;
  color: ${themeVariables.colorWhite};
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  ${props => css`
    background-image: url("${props.image}");
  `}
  
  ${themeVariables.breakXL} {
    height: 400px;
    padding: 0 4vw;
  }
  
  ${themeVariables.breakDesktop} {
    background-position-x: right -100px;
  }
  
  ${themeVariables.breakTablet} {
    background-position-x: right -160px;
  }

  ${themeVariables.breakMobile} {
    background-position-y: bottom -60px;
    height: initial;
    padding: ${themeVariables.spacingL}px 4vw;
  }
  
  ${themeVariables.breakVerySmall} {
    background-position-x: right -110px;
    background-position-y: bottom -30px;
  }
`

export const HeroTeaserDescription = styled.div`
  width: 35%;
  margin: ${themeVariables.spacingL}px 0;
  text-shadow: 0 0 20px rgba(0, 0, 0, 1);

  ${themeVariables.breakXL} {
    width: 40%;
  }
  
  ${themeVariables.breakMobile} {
    width: 100%;
  }
`
