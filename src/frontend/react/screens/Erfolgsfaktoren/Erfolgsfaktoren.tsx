import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFetching } from '../../../store/ui/ui.actions'
import { fetchVideos } from '../../../store/channel/channel.actions'
import { Route } from 'react-router-dom'
import Erfolgsübersicht from './Unterseiten/Erfolgsübersicht'
import Titelanalyse from './Unterseiten/Titelanalyse'
import Gesichteranalyse from './Unterseiten/Gesichteranalyse'
import Objektanalyse from './Unterseiten/Objektanalyse'

const Erfolgsfaktoren: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchVideos())
  }, [])

  return (
    <>
      <Route exact path='/success' component={Erfolgsübersicht} />
      <Route path='/success/titles' component={Titelanalyse} />
      <Route path='/success/faces' component={Gesichteranalyse} />
      <Route path='/success/objects' component={Objektanalyse} />
    </>

  )
}

export default Erfolgsfaktoren
