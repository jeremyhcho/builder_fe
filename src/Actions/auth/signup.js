import {
  CLEAR_SIGNUP_ERROR,
  CREATE_USER,
  UPDATE_USER_PASSWORD
} from 'Constants'

export const clearSignUpError = () => ({
  type: CLEAR_SIGNUP_ERROR
})

// ASYNC
export const createUser = (user) => ({
  type: CREATE_USER,
  user
})

export const updateUserPassword = (userId, params) => ({
  type: UPDATE_USER_PASSWORD,
  userId,
  params
})
