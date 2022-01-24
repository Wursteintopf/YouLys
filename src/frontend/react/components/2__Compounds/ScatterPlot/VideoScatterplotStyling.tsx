import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'

export const ScatterplotStyled = styled.div`
  
`

export const ScatterplotWrapper = styled.div`
  display: flex;
  
  ${themeVariables.breakTablet} {
    flex-direction: column-reverse;
  }
`

export const ScatterPlotSvg = styled.svg`
  width: 75%;
  
  ${themeVariables.breakDesktop} {
    width: 65%;
  }
  
  ${themeVariables.breakTablet} {
    width: 100%;
  }
`

export const ScatterPlotLegend = styled.div`
  width: 25%;
  padding-left: ${themeVariables.spacingM}px;
  display: flex;
  flex-direction: column;

  ${themeVariables.breakDesktop} {
    width: 35%;
  }
  
  ${themeVariables.breakTablet} {
    width: 100%;
    padding-left: 0;
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export const FilterGroup = styled.div`
  margin-bottom: ${themeVariables.spacingS}px;

  ${themeVariables.breakTablet} {
    width: 50%;
  }
  
  ${themeVariables.breakMobile} {
    width: 100%;
  }
`
