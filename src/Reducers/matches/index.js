import moment from 'moment'

// Constants
import {
  RECEIVE_NBA_MATCHES
} from 'Constants'

const matches = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_NBA_MATCHES:
      return action.data.map(match => ({
        ...match, date: moment(match.date)
      }))

    default:
      return state
  }
}

export default matches
