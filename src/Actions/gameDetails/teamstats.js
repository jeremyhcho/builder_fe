// Constants
import {
  FETCH_NBA_TEAM_STATS,
  RECEIVE_NBA_TEAM_STATS
} from 'Constants'

export const fetchNBATeamStats = (id) => ({
  type: FETCH_NBA_TEAM_STATS,
  id
})

export const receiveNBATeamStats = (teamStats) => ({
  type: RECEIVE_NBA_TEAM_STATS,
  teamStats
})
