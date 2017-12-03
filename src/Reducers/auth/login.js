// Constants
import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  CLEAR_LOGIN_ERROR
} from 'Constants'

const initialState = {
  error: '',
  loggingIn: false,
  authorized: false
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggingIn: true }

    case LOGIN_FAILED:
      return { ...state, error: action.error, loggingIn: false }

    case LOGIN_SUCCESS:
      return { ...state, error: '', loggingIn: false }

    case CLEAR_LOGIN_ERROR:
      return { ...state, error: '' }

    case '@@router/LOCATION_CHANGE':
      return initialState

    default:
      return state
  }
}

export default login
