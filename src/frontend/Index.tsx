import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import rootSaga from './store/root.sagas'
import { rootReducer } from './store/root.reducer'
import Start from './react/screens/Start/Start'
import { ContentWrapper, globalStyles } from './styles/GlobalStyling'
import { Global } from '@emotion/react'
import Header from './react/components/Header/Header'
import { createTheme, ThemeProvider } from '@mui/material'
import themeVariables from './styles/themeVariables'
import Footer from './react/components/Footer/Footer'
import Erfolgsfaktoren from './react/screens/Erfolgsfaktoren/Erfolgsfaktoren'
import Kanalliste from './react/screens/Kanalliste/Kanalliste'
import Kanaldetailseite from './react/screens/Kanaldetailseite/Kanaldetailseite'
import Videoliste from './react/screens/Videoliste/Videoliste'
import Videodetailseite from './react/screens/Videodetailseite/Videodetailseite'
import Impressum from './react/screens/Impressum/Impressum'
import Datenschutz from './react/screens/Datenschutz/Datenschutz'
import Erklärung from './react/screens/Erklärung/Erklärung'

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

          <Footer />
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, window.document.getElementById('root'))
