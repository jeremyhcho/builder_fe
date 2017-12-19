import moment from 'moment'

// Constants
import {
  RECEIVE_NBA_MATCHES,
  RECEIVE_PAGINATED_NBA_MATCHES,
  FETCH_NBA_MATCHES,
  PAGINATE_NBA_MATCHES
} from 'Constants'

const initialState = {
  matches: [],
  fetchingMatches: false,
  paginatingMatches: false
}

const matches = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_MATCHES:
      return { ...state, fetchingMatches: true }
    case PAGINATE_NBA_MATCHES:
      return { ...state, paginatingMatches: true }

    case RECEIVE_NBA_MATCHES:
      return {
        ...state,
        fetchingMatches: false,
        matches: action.matches.map(match => ({
          ...match, date: moment(new Date(match.date))
        }))
      }
    case RECEIVE_PAGINATED_NBA_MATCHES: {
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

export default matches
