import styled from '@emotion/styled'

export const VideoBox = styled.g<{ hovered: boolean }>`
  transition: 0.3s;
  
  visibility: ${props => props.hovered ? 'visible' : 'hidden'};
  opacity: ${props => props.hovered ? 1 : 0};
`

export const StyledVideoCircle = styled.g`
  cursor: pointer;
`
