import React from 'react'
import { CircularProgress } from '@mui/material'
import { ProgressStyled } from './ProgressStyling'

const Progress: React.FC = () => {
  return (
    <ProgressStyled>
      <CircularProgress />
    </ProgressStyled>
  )
}

export default Progress
