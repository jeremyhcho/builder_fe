// Constants
import {
  RECEIVE_NBA_TEAM_STATS,
  RECEIVE_NBA_KEY_STATS
} from 'Constants'

const initialState = {
  stats: null,
  keyStats: null
}

const teamStats = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_NBA_TEAM_STATS:
      return { ...state, stats: action.teamStats.data }

    case RECEIVE_NBA_KEY_STATS:
      return { ...state, keyStats: action.keyStats.data }

    default:
      return state
  }
}

export default teamStats
