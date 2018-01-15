// Constants
import {
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from 'Constants'

const initialState = {
  message: '',
  duration: 2000
}

const snackBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return { message: action.message, duration: action.duration }

    case CLOSE_SNACKBAR:
      return initialState

    default:
      return state
  }
}

export default snackBarReducer
