// Constants
import {
  FETCH_NBA_TEAM_STATS,
  RECEIVE_NBA_TEAM_STATS,
  FETCH_NBA_KEY_STATS,
  RECEIVE_NBA_KEY_STATS
} from 'Constants'

export const fetchNBATeamStats = (id) => ({
  type: FETCH_NBA_TEAM_STATS,
  id
})

export const receiveNBATeamStats = (teamStats) => ({
  type: RECEIVE_NBA_TEAM_STATS,
  teamStats
})

export const fetchNBAKeyStats = (id) => ({
  type: FETCH_NBA_KEY_STATS,
  id
})

export const receiveNBAKeyStats = (keyStats) => ({
  type: RECEIVE_NBA_KEY_STATS,
  keyStats
})
