import createRoutine from 'Routines'

// Apis
import {
  getNBAPlayerStats
} from 'Apis'

// Constants
import {
  FETCH_NBA_PLAYER_STATS,
  CHANGE_SORT_STATS_KEY
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

export const changeSortStatsKey = (stat, playerType, teamType) => ({
  type: CHANGE_SORT_STATS_KEY,
  stat,
  playerType,
  teamType
})
