// Constants
import {
  RECEIVE_NBA_SUMMARY,
  RECEIVE_NBA_QUARTERS,
  RECEIVE_NBA_RECENT_GAMES
} from 'Constants'

const initialState = {
  summary: null,
  quarters: null,
  recentGames: null
}

const overview = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_NBA_SUMMARY:
      return {
        ...state,
        summary: action.summary.data
      }

    case RECEIVE_NBA_QUARTERS:
      return {
        ...state,
        quarters: action.quarters.data
      }

    case RECEIVE_NBA_RECENT_GAMES:
      return {
        ...state,
        recentGames: action.recentGames.data
      }

    default:
      return state
  }
}

export default overview
