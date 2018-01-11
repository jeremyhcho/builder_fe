import { combineReducers } from 'redux'

import login from './login'
import signup from './signup'
import forgot from './forgot'
import reset from './reset'
import authState from './authState'
import verify from './verify'

const auth = combineReducers({
  login,
  signup,
  forgot,
  reset,
  authState,
  verify
})

export default auth
