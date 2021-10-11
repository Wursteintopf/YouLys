import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import rootSaga from './store/root.sagas'
import { rootReducer } from './store/root.reducer'
import Start from './react/screens/Start'
import { globalStyles } from './styles/GlobalStyling'
import { Global } from '@emotion/react'

const App = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  )
  sagaMiddleware.run(rootSaga)

  return (
    <Provider store={store}>
      <Router>
        <Global styles={globalStyles} />

        <Route exact path='/' component={Start} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, window.document.getElementById('root'))
