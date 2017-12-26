import {
  RECEIVE_NBA_PLAYER_STATS
} from 'Constants'

const initialState = {
  stats: null
}

const playerStats = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_NBA_PLAYER_STATS:
      return { ...state, stats: action.playerStats.data }

    default:
      return state
  }
}

export default playerStats
