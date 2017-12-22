// Constants
import {
  RECEIVE_NBA_TEAM_STATS
} from 'Constants'

const initialState = {}

const teamStats = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_NBA_TEAM_STATS:
      return action.teamStats.data

    default:
      return state
  }
}

export default teamStats
