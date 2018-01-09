import {
  CLEAR_LOGIN_ERROR,
  AUTHORIZE,
  UNAUTHORIZE,
  LOGIN,
  LOGOUT,
  FETCH_USER,
} from 'Constants'

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR
})

export const authorize = () => ({
  type: AUTHORIZE
})

export const unauthorize = () => ({
  type: UNAUTHORIZE
})

// ASYNC
export const loginUser = (params) => ({
  type: LOGIN,
  params
})

export const logoutUser = (params) => ({
  type: LOGOUT,
  params
})

export const fetchUser = () => ({
  type: FETCH_USER
})
