import pathToRegexp from 'path-to-regexp'

// Constants
import {
  FETCH_NBA_PLAYER_STATS_SUCCESS
} from 'Constants'

const initialState = {
  stats: null
}

const playerStats = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_PLAYER_STATS_SUCCESS:
      return { ...state, stats: action.playerStats.data }

    case '@@router/LOCATION_CHANGE': {
      const route = '/games/:id/:players'
      if (pathToRegexp(route).exec(action.payload.pathname)) {
        return state
      }
      return initialState
    }

    default:
      return state
  }
}

export default playerStats
