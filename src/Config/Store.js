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

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

export default store
