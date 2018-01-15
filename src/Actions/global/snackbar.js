import {
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from 'Constants'

export const openSnackbar = (message, duration) => ({
  type: OPEN_SNACKBAR,
  message,
  duration
})

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR
})
