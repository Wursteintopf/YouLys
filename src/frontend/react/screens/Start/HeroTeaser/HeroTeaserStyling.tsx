import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'
import { css } from '@emotion/react'

export const HeroTeaserStyled = styled.div`
  background-color: ${themeVariables.colorBlack};  
  height: ${themeVariables.heroTeaserHeight}px;
`

export const HeroTeaserContent = styled.div<{ image?: string }>`
  height: ${themeVariables.heroTeaserHeight}px;
  background-repeat: no-repeat;
  background-position-x: 250px;
  color: ${themeVariables.colorWhite};
  display: flex;
  flex-direction: column;
  height: ${themeVariables.heroTeaserHeight}px;
  justify-content: center;
  
  ${props => css`
    background-image: url("${props.image}");
  `}
`

export const HeroTeaserDescription = styled.div`
  width: 500px;
  margin: ${themeVariables.spacingL}px 0;
`
