// Constants
import {
  VERIFY_USER_FAIL,
  VERIFY_USER_SUCCESS
} from 'Constants'

const initialState = {
  validToken: true,
  validatingToken: true
}

const reset = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_USER_SUCCESS:
      return { ...state, validToken: true, validatingToken: false }

    case VERIFY_USER_FAIL:
      return { ...state, validToken: false, validatingToken: false }

    default:
      return state
  }
}

export default reset
