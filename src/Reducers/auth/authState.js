import { AUTHORIZE, UNAUTHORIZE } from 'Constants'

const authState = (state = { authorized: false }, action) => {
  switch (action.type) {
    case AUTHORIZE:
      return { ...state, authorized: true }

    case UNAUTHORIZE:
      return { ...state, authorized: false }

    default:
      return state
  }
}

export default authState
