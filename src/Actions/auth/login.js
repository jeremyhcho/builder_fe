import {
  CLEAR_LOGIN_ERROR,
  AUTHORIZE,
  UNAUTHORIZE,
  LOGIN
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
