import { combineReducers } from 'redux'

import login from './login'
import signup from './signup'
import forgot from './forgot'
import reset from './reset'
import authState from './authState'

const auth = combineReducers({
  login,
  signup,
  forgot,
  reset,
  authState
})

export default auth
