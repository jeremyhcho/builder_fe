// Constants
import {
  FETCH_NBA_PLAYER_STATS,
  RECEIVE_NBA_PLAYER_STATS
} from 'Constants'

export const fetchNBAPlayerStats = (id) => ({
  type: FETCH_NBA_PLAYER_STATS,
  id
})

export const receiveNBAPlayerStats = (playerStats) => ({
  type: RECEIVE_NBA_PLAYER_STATS,
  playerStats
})
