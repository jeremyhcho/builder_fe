import createRoutine from 'Routines'

// Actions
import { openSnackbar } from 'Actions'

// Apis
import {
  updatePassword
} from 'Apis'

import {
  RESET_PASSWORD,
  VALIDATE_RESET_TOKEN,
  UPDATE_PASSWORD
} from 'Constants'

export const resetPassword = (password) => ({
  type: RESET_PASSWORD,
  password
})

export const validateResetToken = (params) => ({
  type: VALIDATE_RESET_TOKEN,
  params
})

export const changePassword = createRoutine({
  prefix: UPDATE_PASSWORD,
  api: updatePassword,
  reducerKey: ['passwordChanged']
  transform: 'replace',
  onSuccess: () => openSnackbar('Password changed', 3000)
})
