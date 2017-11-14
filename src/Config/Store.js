import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import history from '../History'

// Root Reducer
import rootReducer from 'Reducers'

// Root Saga
import rootSaga from 'Sagas'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware, routerMiddleware(history)]

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
)
/* eslint-enable */

sagaMiddleware.run(rootSaga)

export default store
