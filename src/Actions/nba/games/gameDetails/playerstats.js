import createRoutine from 'Routines'

// Apis
import {
  getNBAPlayerStats
} from 'Apis'

// Constants
import {
  FETCH_NBA_PLAYER_STATS,
} from 'Constants'

export const fetchNBAPlayerStats = createRoutine(
  FETCH_NBA_PLAYER_STATS,
  getNBAPlayerStats,
  {
    reducerKey: {
      sport: 'nba',
      type: 'playerStats'
    },
    transform: 'replace'
  }
)
