import styled from '@emotion/styled'

export const BarChartStyled = styled.div`
  
`

export const HoverGroup = styled.g`
  .hovertext {
    visibility: hidden;
    opacity: 0;
  }
  
  &:hover .hovertext {
    visibility: visible;
    opacity: 1;
  }
  
  &:hover rect {
    filter: saturate(0.7) brightness(1.5);
  }
`
