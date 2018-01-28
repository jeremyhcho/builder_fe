import createRoutine from 'Routines'

// Apis
import {
  getNBAPlayerStats
} from 'Apis'

// Constants
import {
  FETCH_NBA_PLAYER_STATS,
} from 'Constants'

export const fetchNBAPlayerStats = createRoutine({
  prefix: FETCH_NBA_PLAYER_STATS,
  api: getNBAPlayerStats,
  reducerKey: {
    primaryKey: 'nba',
    type: 'playerStats'
  },
  transform: 'replace'
})
