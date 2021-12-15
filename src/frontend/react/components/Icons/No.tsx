import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { RoundedIcon } from './IconStyling'

const No: React.FC = () => {
  return (
    <RoundedIcon color='red'>
      <CloseIcon />
    </RoundedIcon>
  )
}

export default No
