import styled from '@emotion/styled'
import themeVariables from '../../../styles/themeVariables'

export const Headline = styled.h3`
  margin: 0;
  font-size: ${themeVariables.fontSizeRegular}px;
  font-weight: ${themeVariables.fontWeightBold};
  text-transform: uppercase;
`

export const SubLine = styled.h4`
  margin: 0;
  font-size: ${themeVariables.fontSizeRegular}px;
  font-weight: ${themeVariables.fontWeightRegular};
`

export const Bold = styled.span`
  font-size: ${themeVariables.fontSizeRegular}px;
  font-weight: ${themeVariables.fontWeightBold};
`
