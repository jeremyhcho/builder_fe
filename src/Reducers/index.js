import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers
import auth from './auth'
import nbaReducer from './nba'
import notificationsReducer from './notifications'

// Constants
import { LOGOUT_SUCCESS } from 'Constants'

const appReducer = combineReducers({
  auth,
  nba: nbaReducer,
  router: routerReducer,
  form: formReducer,
  notifications: notificationsReducer
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    /* eslint-disable no-param-reassign */
    state = undefined
    /* eslint-enable no-param-reassign */
  }

  return appReducer(state, action)
}

export default rootReducer
