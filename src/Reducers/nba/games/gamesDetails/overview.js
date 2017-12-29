import pathToRegexp from 'path-to-regexp'

// Constants
import {
  FETCH_NBA_SUMMARY_SUCCESS,
  FETCH_NBA_QUARTERS_SUCCESS,
  FETCH_NBA_RECENT_GAMES_SUCCESS,
  FETCH_NBA_STARTING_LINEUP_SUCCESS,
  FETCH_NBA_INJURIES_SUCCESS
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
    case FETCH_NBA_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.summary.data
      }

    case FETCH_NBA_QUARTERS_SUCCESS:
      return {
        ...state,
        quarters: action.quarters.data
      }

    case FETCH_NBA_RECENT_GAMES_SUCCESS:
      return {
        ...state,
        recentGames: action.recentGames.data
      }

    case FETCH_NBA_STARTING_LINEUP_SUCCESS:
      return {
        ...state,
        startingLineup: action.startingLineup.data
      }

    case FETCH_NBA_INJURIES_SUCCESS:
      return {
        ...state,
        injuries: action.injuries.data
      }

    case '@@router/LOCATION_CHANGE': {
      const route = '/games/:id/:overview'
      if (pathToRegexp(route).exec(action.payload.pathname)) {
        return state
      }
      return initialState
    }

    default:
      return state
  }
}

export default overview
