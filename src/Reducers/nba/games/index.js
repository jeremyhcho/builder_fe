import moment from 'moment'

// Constants
import {
  FETCH_NBA_GAMES
} from 'Constants'

const initialState = {
  dates: {
    now: moment(moment().format('YYYY-MM-DD')),
    from: {},
    to: {}
  }
}

const games = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_GAMES: {
      const { now, from, to } = action.payload[0]

      return {
        ...state,
        dates: { now, from, to }
      }
    }

    default:
      return state
  }
}

export default games
