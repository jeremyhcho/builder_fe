import { combineReducers } from 'redux'

// Reducers
import authState from './authState'

const admin = combineReducers({
  authState
})

export default admin
