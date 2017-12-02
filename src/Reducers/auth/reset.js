// Constants
import {
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  VALIDATE_RESET_TOKEN_FAIL
} from 'Constants'

const initialState = {
  success: false,
  error: '',
  validToken: true,
  updatingUser: false
}

const reset = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_RESET_TOKEN_FAIL:
      return { ...state, validToken: false }

    case UPDATE_USER:
      return { ...state, updatingUser: true }

    case UPDATE_USER_SUCCESS:
      return { ...state, updatingUser: false, error: '' }

    case UPDATE_USER_FAIL:
      return { ...state, updatingUser: false, error: action.error }

    case '@@router/LOCATION_CHANGE':
      return initialState

    default:
      return state
  }
}

export default reset
