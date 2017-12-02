import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers
import auth from './auth'

const rootReducer = combineReducers({
  auth,
  router: routerReducer,
  form: formReducer
})

export default rootReducer
