import moment from 'moment'

// Constants
import {
  FETCH_NBA_MATCHES
} from 'Constants'

const initialState = {
  now: moment(moment().format('YYYY-MM-DD')),
  from: {},
  to: {}
}

const date = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_MATCHES: {
      const { now, from, to } = action
      return { ...state, now, from, to }
    }

    default:
      return state
  }
}

export default date
