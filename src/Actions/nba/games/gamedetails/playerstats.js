// Constants
import {
  FETCH_NBA_PLAYER_STATS,
  FETCH_NBA_PLAYER_STATS_SUCCESS
} from 'Constants'

export const fetchNBAPlayerStats = (id) => ({
  type: FETCH_NBA_PLAYER_STATS,
  id
})

export const fetchNBAPlayerStatsSuccess = (playerStats) => ({
  type: FETCH_NBA_PLAYER_STATS_SUCCESS,
  playerStats
})
