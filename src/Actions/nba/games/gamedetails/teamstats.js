// Constants
import {
  FETCH_NBA_TEAM_STATS,
  FETCH_NBA_TEAM_STATS_SUCCESS,
  FETCH_NBA_KEY_STATS,
  FETCH_NBA_KEY_STATS_SUCCESS
} from 'Constants'

export const fetchNBATeamStats = (id) => ({
  type: FETCH_NBA_TEAM_STATS,
  id
})

export const fetchNBATeamStatsSuccess = (teamStats) => ({
  type: FETCH_NBA_TEAM_STATS_SUCCESS,
  teamStats
})

export const fetchNBAKeyStats = (id) => ({
  type: FETCH_NBA_KEY_STATS,
  id
})

export const fetchNBAKeyStatsSuccess = (keyStats) => ({
  type: FETCH_NBA_KEY_STATS_SUCCESS,
  keyStats
})
