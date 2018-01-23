import pathToRegexp from 'path-to-regexp'

// Constants
import {
  FETCH_NBA_TEAM_STATS_SUCCESS,
  FETCH_NBA_KEY_STATS_SUCCESS
} from 'Constants'

const initialState = {
  stats: null,
  keyStats: null
}

const teamStats = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_TEAM_STATS_SUCCESS:
      return { ...state, stats: action.teamStats.data }

    case FETCH_NBA_KEY_STATS_SUCCESS:
      return { ...state, keyStats: action.keyStats.data }

    case '@@router/LOCATION_CHANGE': {
      const route = '/games/:id/:teams'
      if (pathToRegexp(route).exec(action.payload.pathname)) {
        return state
      }
      return initialState
    }

    default:
      return state
  }
}

export default teamStats
