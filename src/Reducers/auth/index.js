import { combineReducers } from 'redux'

import login from './login'
import signup from './signup'
import forgot from './forgot'
import reset from './reset'

const auth = combineReducers({
  login,
  signup,
  forgot,
  reset
})

export default auth
