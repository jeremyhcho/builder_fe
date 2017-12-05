import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers
import auth from './auth'
import matches from './matches'

const rootReducer = combineReducers({
  auth,
  matches,
  router: routerReducer,
  form: formReducer
})

export default rootReducer
