// Constants
import {
  RECEIVE_NBA_SUMMARY,
  RECEIVE_NBA_QUARTERS,
  RECEIVE_NBA_RECENT_GAMES,
  RECEIVE_NBA_STARTING_LINEUP,
  RECEIVE_NBA_INJURIES
} from 'Constants'

const initialState = {
  summary: null,
  quarters: null,
  recentGames: null,
  startingLineup: null,
  injuries: null
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

    case RECEIVE_NBA_STARTING_LINEUP:
      return {
        ...state,
        startingLineup: action.startingLineup.data
      }

    case RECEIVE_NBA_INJURIES:
      return {
        ...state,
        injuries: action.injuries.data
      }

    default:
      return state
  }
}

export default overview
