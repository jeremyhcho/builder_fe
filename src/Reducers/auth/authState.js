import {
  AUTHORIZE,
  UNAUTHORIZE,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  CREATE_USER_SUCCESS
} from 'Constants'

const initialState = {
  authorized: false,
  user: {},
  fetchingUser: false
}

const authState = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZE:
      return { ...state, authorized: true, fetchingUser: false }

    case UNAUTHORIZE:
      return { ...state, authorized: false, fetchingUser: false }

    case FETCH_USER:
      return { ...state, fetchingUser: true }

    case FETCH_USER_SUCCESS:
      return { ...state, user: action.user, fetchingUser: false }

    case CREATE_USER_SUCCESS:
      return { ...state, user: action.user, fetchingUser: false }

    default:
      return state
  }
}

export default authState
