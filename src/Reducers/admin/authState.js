import {
  VERIFY_ADMIN
} from 'Constants'

const initialState = {
  isAdmin: false,
  confirmed: false
}

const authState = (state = initialState, action) => {
  switch (action.type) {
    case `${VERIFY_ADMIN}/SUCCESS`:
      return { ...state, isAdmin: true, confirmed: true }

    case `${VERIFY_ADMIN}/FAIL`:
      return { ...state, isAdmin: false, confirmed: true }

    default:
      return state
  }
}

export default authState
