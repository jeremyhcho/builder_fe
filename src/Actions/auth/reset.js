import {
  RESET_PASSWORD,
  VALIDATE_RESET_TOKEN
} from 'Constants'

export const resetPassword = (password) => ({
  type: RESET_PASSWORD,
  password
})

export const validateResetToken = (params) => ({
  type: VALIDATE_RESET_TOKEN,
  params
})
