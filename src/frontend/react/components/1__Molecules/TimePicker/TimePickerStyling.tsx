import styled from '@emotion/styled'
import { Select } from '@mui/material'
import themeVariables from '../../../../styles/themeVariables'

export const StyledSelect = styled(Select)`
  border-radius: 20px;
  background-color: ${themeVariables.colorLightGrey};
  padding: 0 ${themeVariables.spacingM}px;
  
  ${themeVariables.breakMobile} {
    padding: 0 ${themeVariables.spacingS}px;
    font-size: 12px;
  }
`

export const DatePickerWrapper = styled.div`
  padding: ${themeVariables.spacingM}px;
  display: flex;
`

export const DatePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:first-of-type {
    border-right: 1px solid ${themeVariables.colorLightGrey};
  }
`
