import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers
import auth from './auth'
import matches from './matches'
import dates from './dates'

const rootReducer = combineReducers({
  auth,
  matches,
  dates,
  router: routerReducer,
  form: formReducer
})

export default rootReducer
