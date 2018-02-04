import createRoutine from 'Routines'

// Apis
import {
  getNBATeamStats,
  getNBAKeyStats
} from 'Apis'

// Constants
import {
  FETCH_NBA_TEAM_STATS,
  FETCH_NBA_KEY_STATS
} from 'Constants'

export const fetchNBATeamStats = createRoutine({
  prefix: FETCH_NBA_TEAM_STATS,
  api: getNBATeamStats,
  reducerKey: ['nba', 'teamStats'],
  transform: 'replace'
})

export const fetchNBAKeyStats = createRoutine({
  prefix: FETCH_NBA_KEY_STATS,
  api: getNBAKeyStats,
  reducerKey: ['nba', 'keyStats'],
  transform: 'replace'
})
