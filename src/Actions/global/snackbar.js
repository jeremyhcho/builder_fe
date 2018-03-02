import {
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from 'Constants'

export const openSnackbar = (message, duration, action) => ({
  type: OPEN_SNACKBAR,
  message,
  duration,
  action
})

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR
})
