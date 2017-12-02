import {
  SEND_RECOVERY_EMAIL,
  CLEAR_FORGOT_FAIL,
  CLEAR_FORGOT_SUCCESS
} from 'Constants'

export const sendRecoveryEmail = (email) => ({
  type: SEND_RECOVERY_EMAIL,
  email
})

export const clearForgotError = () => ({
  type: CLEAR_FORGOT_FAIL
})

export const clearForgotSuccess = () => ({
  type: CLEAR_FORGOT_SUCCESS
})
