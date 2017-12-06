// Constants
import {
  RECEIVE_NBA_MATCHES
} from 'Constants'

const matches = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_NBA_MATCHES:
      return action.data

    default:
      return state
  }
}

export default matches
