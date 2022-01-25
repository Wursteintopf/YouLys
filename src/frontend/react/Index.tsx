import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import rootSaga from '../store/root.sagas'
import { rootReducer } from '../store/root.reducer'
import Start from './screens/Start/Start'
import { ContentWrapper, globalStyles } from '../styles/GlobalStyling'
import { Global } from '@emotion/react'
import Header from './components/2__Compounds/Header/Header'
import { createTheme, ThemeProvider } from '@mui/material'
import themeVariables from '../styles/themeVariables'
import Footer from './components/2__Compounds/Footer/Footer'
import Erfolgsfaktoren from './screens/Erfolgsfaktoren/Erfolgsfaktoren'
import Kanalliste from './screens/Kanalliste/Kanalliste'
import Kanaldetailseite from './screens/Kanaldetailseite/Kanaldetailseite'
import Videoliste from './screens/Videoliste/Videoliste'
import Videodetailseite from './screens/Videodetailseite/Videodetailseite'
import Impressum from './screens/Impressum/Impressum'
import Datenschutz from './screens/Datenschutz/Datenschutz'
import Erklärung from './screens/Erklärung/Erklärung'
import NotFound from './screens/NotFound/NotFound'
import ErrorCatcher from './components/2__Compounds/ErrorCatcher/ErrorCatcher'

const App = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  )
  sagaMiddleware.run(rootSaga)

  const theme = createTheme({
    palette: {
      primary: {
        main: themeVariables.colorBlue,
      },
      secondary: {
        main: themeVariables.colorOrange,
      },
    },
  })

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />

          <ErrorCatcher />

          <Header />

          <Route exact path='/' component={Start} />
          <Route path='/success' component={Erfolgsfaktoren} />
          <Route path='/channels' component={Kanalliste} />
          <Route path='/channeldetails' component={Kanaldetailseite} />
          <Route path='/videos' component={Videoliste} />
          <Route path='/videodetails' component={Videodetailseite} />
          <Route path='/impressum' component={Impressum} />
          <Route path='/datenschutz' component={Datenschutz} />
          <Route path='/explanation' component={Erklärung} />
          <Route path='/notfound' component={NotFound} />

          <Footer />
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, window.document.getElementById('root'))
