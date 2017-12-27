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

    default:
      return state
  }
}

export default playerStats
