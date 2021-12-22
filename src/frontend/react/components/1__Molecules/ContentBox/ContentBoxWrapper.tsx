import { css } from '@emotion/react'
import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'

export const ContentBoxWrapper = styled.div<{ amountOfChildren: number }>`
  margin-top: ${themeVariables.spacingL}px;
  display: flex;
  
  ${props => css`
    > div {
      width: ${(1 / props.amountOfChildren) * 100}%;
    }
  `}
`
