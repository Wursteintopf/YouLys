import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'
import { Button } from '@mui/material'

const StyledButton = styled(Button)`
  width: max-content;
  padding: ${themeVariables.spacingS}px ${themeVariables.spacingL}px;
  border: 1px solid ${themeVariables.colorWhite};
  border-radius: 25px;
  color: ${themeVariables.colorWhite};
  font-size: ${themeVariables.fontSizeRegular}px;
  text-transform: none;
  font-weight: ${themeVariables.fontWeightRegular};
`

export default StyledButton
