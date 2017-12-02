// Constants
import {
  SEND_RECOVERY_EMAIL,
  SEND_RECOVERY_EMAIL_SUCCESS,
  SEND_RECOVERY_EMAIL_FAIL,
  CLEAR_FORGOT_SUCCESS,
  CLEAR_FORGOT_FAIL
} from 'Constants'

const initialState = {
  error: '',
  sendingEmail: false,
  success: false
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case SEND_RECOVERY_EMAIL:
      return { ...state, sendingEmail: true }

    case SEND_RECOVERY_EMAIL_SUCCESS:
      return { ...state, sendingEmail: false, success: true }

    case SEND_RECOVERY_EMAIL_FAIL:
      return { ...state, sendingEmail: false, error: action.error }

    case CLEAR_FORGOT_SUCCESS:
      return { ...state, success: false }

    case CLEAR_FORGOT_FAIL:
      return { ...state, error: '' }

    case '@@router/LOCATION_CHANGE':
      return initialState

    default:
      return state
  }
}

export default login
