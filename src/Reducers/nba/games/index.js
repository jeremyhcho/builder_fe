import moment from 'moment'

// Constants
import {
  FETCH_NBA_GAMES_SUCCESS,
  PAGINATE_NBA_GAMES_SUCCESS,
  FETCH_NBA_GAMES,
  PAGINATE_NBA_GAMES
} from 'Constants'

const initialState = {
  matches: [],
  fetchingMatches: false,
  paginatingMatches: false,
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
        fetchingMatches: true,
        dates: { now, from, to }
      }
    }

    case PAGINATE_NBA_GAMES:
      return { ...state, paginatingMatches: true }

    case FETCH_NBA_GAMES_SUCCESS:
      return {
        ...state,
        fetchingMatches: false,
        matches: action.matches.map(match => ({
          ...match, date: moment(new Date(match.date))
        }))
      }
    case PAGINATE_NBA_GAMES_SUCCESS: {
      let newMatches

      if (action.paginateType === 'previous') {
        newMatches = action.matches.concat(state.matches)
      } else {
        newMatches = state.matches.concat(action.matches)
      }
      return {
        ...state,
        paginatingMatches: false,
        matches: newMatches.map(match => ({
          ...match, date: moment(new Date(match.date))
        }))
      }
    }

    default:
      return state
  }
}

export default games
