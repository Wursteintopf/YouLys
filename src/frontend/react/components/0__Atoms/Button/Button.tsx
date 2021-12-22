import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'
import { Button } from '@mui/material'
import { css } from '@emotion/react'

const StyledButton = styled(Button)`
  width: max-content;
  padding: ${themeVariables.spacingS}px ${themeVariables.spacingL}px;
  border-radius: 25px;
  font-size: ${themeVariables.fontSizeRegular}px;
  text-transform: none;
  font-weight: ${themeVariables.fontWeightRegular};
  
  ${props => css`
    color: ${props.variant === 'contained' ? themeVariables.colorDarkGrey : themeVariables.colorWhite};
    border: ${props.variant === 'contained' ? 'none' : ('1px solid' + themeVariables.colorWhite)};
  `}
`

export default StyledButton
