import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer
})

export default rootReducer
