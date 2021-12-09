import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { RoundedIcon } from './IconStyling'

const Yes: React.FC = () => {
  return (
    <RoundedIcon color='green'>
      <CheckIcon />
    </RoundedIcon>
  )
}

export default Yes
