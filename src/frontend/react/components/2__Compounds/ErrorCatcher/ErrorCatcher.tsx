import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getError } from '../../../../store/ui/ui.selector'
import { ApiStatusCodes } from '../../../../../shared/Enums/ApiStatusCodes'
import { useHistory } from 'react-router'
import { resetError } from '../../../../store/ui/ui.actions'

const ErrorCatcher: React.FC = () => {
  const error = useSelector(getError)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (error === ApiStatusCodes.NOT_FOUND) {
      dispatch(resetError())
      history.push('/notfound')
    }
  }, [error])

  return (
    <></>
  )
}

export default ErrorCatcher
