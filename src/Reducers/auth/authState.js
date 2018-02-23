import {
  AUTHORIZE,
  UNAUTHORIZE,
  CREATE_USER_SUCCESS
} from 'Constants'

const initialState = {
  authorized: false,
  user: {},
  fetchingUser: true
}

const authState = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZE:
      return { ...state, authorized: true, fetchingUser: false, user: action.user }

    case UNAUTHORIZE:
      return { ...state, authorized: false, fetchingUser: false, user: {} }

    case CREATE_USER_SUCCESS:
      return { ...state, user: action.user, fetchingUser: false }

    default:
      return state
  }
}

export default authState
