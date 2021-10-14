import styled from '@emotion/styled'
import { Select } from '@mui/material'
import themeVariables from '../../../styles/themeVariables'

export const TimePickerStyled = styled(Select)`
  border-radius: 20px;
  background-color: ${themeVariables.colorLightGrey};
  padding-left: ${themeVariables.spacingM}px; 
  padding-right: ${themeVariables.spacingM}px; 
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
