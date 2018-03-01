// Constants
import {
  CLEAR_SIGNUP_ERROR,
  CREATE_USER,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  RESEND_VERIFICATION_EMAIL,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  RESEND_VERIFICATION_EMAIL_FAIL
} from 'Constants'

const initialState = {
  error: '',
  creatingUser: false,
  userCreated: false,
  sendingEmail: false,
  user: {}
}

const signup = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SIGNUP_ERROR:
      return { ...state, error: '' }

    case CREATE_USER:
      return { ...state, creatingUser: true }

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        creatingUser: false,
        error: '',
        userCreated: true,
        user: action.user
      }

    case CREATE_USER_FAIL:
      return { ...state, creatingUser: false, error: action.error }

    case RESEND_VERIFICATION_EMAIL:
      return { ...state, sendingEmail: true }

    case RESEND_VERIFICATION_EMAIL_SUCCESS:
      return { ...state, sendingEmail: false }

    case RESEND_VERIFICATION_EMAIL_FAIL:
      return { ...state, sendingEmail: false }

    case '@@router/LOCATION_CHANGE':
      return initialState

    default:
      return state
  }
}

export default signup
