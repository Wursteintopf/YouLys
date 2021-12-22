import React from 'react'
import { ToolTipContent, ToolTipIButton, ToolTipStyled } from './ToolTipStyling'

interface ToolTipProps {
  offSetX?: number
  offSetY?: number
}

const ToolTip: React.FC<ToolTipProps> = (props) => {
  return (
    <ToolTipStyled
      offSetX={props.offSetX}
      offSetY={props.offSetY}
    >
      <ToolTipIButton>i</ToolTipIButton>
      <ToolTipContent>
        {props.children}
      </ToolTipContent>
    </ToolTipStyled>
  )
}

export default ToolTip
