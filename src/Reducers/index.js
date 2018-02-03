import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers
import auth from './auth'
import nbaReducer from './nba'
import notificationsReducer from './notifications'
import snackBarReducer from './snackbar'
import routines from './routines'
import adminReducer from './admin'
import globalInfoReducer from './globalInfo'

const appReducer = combineReducers({
  auth,
  nba: nbaReducer,
  router: routerReducer,
  form: formReducer,
  notifications: notificationsReducer,
  snackbar: snackBarReducer,
  admin: adminReducer,
  globalInfo: globalInfoReducer,
  routines
})

const rootReducer = (state, action) => {
  if (action.type === 'auth/LOGOUT') {
    /* eslint-disable no-param-reassign */
    state = undefined
    /* eslint-enable no-param-reassign */
  }

  return appReducer(state, action)
}

export default rootReducer
