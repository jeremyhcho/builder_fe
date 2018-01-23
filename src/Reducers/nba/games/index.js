import moment from 'moment'

// Constants
import {
  FETCH_NBA_GAMES_SUCCESS,
  FETCH_NBA_GAMES,
} from 'Constants'

const initialState = {
  gamesList: [],
  fetchingGames: false,
  dates: {
    now: moment(moment().format('YYYY-MM-DD')),
    from: {},
    to: {}
  }
}

const games = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_GAMES: {
      const { now, from, to } = action
      return {
        ...state,
        fetchingGames: true,
        dates: { now, from, to }
      }
    }

    case FETCH_NBA_GAMES_SUCCESS:
      return {
        ...state,
        fetchingGames: false,
        gamesList: action.games.data.map(match => ({
          ...match, date: moment(new Date(match.date))
        }))
      }

    default:
      return state
  }
}

export default games
