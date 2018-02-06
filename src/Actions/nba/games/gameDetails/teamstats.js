import createRoutine from 'Routines'

// Apis
import {
  getNBATeamMatchStats,
  getNBAKeyStats
} from 'Apis'

// Constants
import {
  FETCH_NBA_TEAM_MATCH_STATS,
  FETCH_NBA_KEY_STATS
} from 'Constants'

export const fetchNBATeamMatchStats = createRoutine({
  prefix: FETCH_NBA_TEAM_MATCH_STATS,
  api: getNBATeamMatchStats,
  reducerKey: ['nba', 'teamMatchStats'],
  transform: 'replace'
})

export const fetchNBAKeyStats = createRoutine({
  prefix: FETCH_NBA_KEY_STATS,
  api: getNBAKeyStats,
  reducerKey: ['nba', 'keyStats'],
  transform: 'replace'
})
