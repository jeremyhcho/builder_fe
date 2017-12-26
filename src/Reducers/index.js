import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers
import auth from './auth'
import nbaReducer from './nba'

const rootReducer = combineReducers({
  auth,
  nba: nbaReducer,
  router: routerReducer,
  form: formReducer
})

export default rootReducer
