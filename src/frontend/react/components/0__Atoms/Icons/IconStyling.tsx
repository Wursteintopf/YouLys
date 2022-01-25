import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'

export const RoundedIcon = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeVariables.colorWhite};
  flex-shrink: 0;
`
