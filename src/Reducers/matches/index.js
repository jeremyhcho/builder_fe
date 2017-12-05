// Constants
import {
  FETCH_MATCHES
} from 'Constants'

const matches = (state = [], action) => {
  switch (action.type) {
    case FETCH_MATCHES: {
      console.log(action)
      return { ...state }
    }

    default:
      return state
  }
}

export default matches
