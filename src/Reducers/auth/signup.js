// Constants
import {
  CLEAR_SIGNUP_ERROR,
  CREATE_USER,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS
} from 'Constants'

const initialState = {
  error: '',
  creatingUser: false
}

const signup = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SIGNUP_ERROR:
      return { ...state, error: '' }

    case CREATE_USER:
      return { ...state, creatingUser: true }

    case CREATE_USER_SUCCESS:
      return { ...state, creatingUser: false, error: '' }

    case CREATE_USER_FAIL:
      return { ...state, creatingUser: false, error: action.error }

    case '@@router/LOCATION_CHANGE':
      return initialState

    default:
      return state
  }
}

export default signup
