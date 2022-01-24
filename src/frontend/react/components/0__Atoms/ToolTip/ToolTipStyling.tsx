import styled from '@emotion/styled'
import themeVariables from '../../../../styles/themeVariables'
import { css } from '@emotion/react'

export const ToolTipStyled = styled.div<{ offSetX?: number, offSetY?: number }>`
  position: absolute;
  
  ${props => css`
    top: ${props.offSetY ? (props.offSetY + 'px') : 0};
    right: ${props.offSetX ? ((-props.offSetX - 14) + 'px') : '-14px'};
  `}
`

export const ToolTipIButton = styled.div`
  background-color: ${themeVariables.colorDarkGrey};
  border-radius: 50%;
  color: ${themeVariables.colorWhite};
  font-size: 8px;
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover + div {
    visibility: visible;
    opacity: 1;
  }
`

export const ToolTipContent = styled.div`
  position: absolute;
  z-index: 100;
  left: 12px;
  width: 300px;
  padding: ${themeVariables.spacingM}px ${themeVariables.spacingM}px ${themeVariables.spacingM - 15}px ${themeVariables.spacingM}px;
  background-color: ${themeVariables.colorWhite};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
  visibility: hidden;
  opacity: 0;
`
