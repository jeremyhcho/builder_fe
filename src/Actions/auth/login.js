import { createRoutine } from 'Routines'

// Constants
import {
  CLEAR_LOGIN_ERROR,
  AUTHORIZE,
  UNAUTHORIZE,
  LOGIN,
  LOGOUT,
  FETCH_USER,
} from 'Constants'

// Apis
import { logout } from 'Apis'

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR
})

export const authorize = (user) => ({
  type: AUTHORIZE,
  user
})

export const unauthorize = () => ({
  type: UNAUTHORIZE
})

// ASYNC
export const loginUser = (params) => ({
  type: LOGIN,
  params
})

export const logoutUser = createRoutine({
  prefix: LOGOUT,
  reducerKey: [],
  transform: () => null,
  api: logout
})

export const fetchUser = () => ({
  type: FETCH_USER
})
