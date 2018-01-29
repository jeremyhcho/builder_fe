import createRoutine from 'Routines'

// Apis
import {
  getNBASummary,
  getNBAQuarters,
  getNBARecentGames,
  getNBAStartingLineup,
  getNBAInjuries,
  getNBALines,
  getNBACompletedTeamStats
} from 'Apis'

// Constants
import {
  FETCH_NBA_SUMMARY,
  CLEAR_NBA_SUMMARY,
  FETCH_NBA_QUARTERS,
  FETCH_NBA_RECENT_GAMES,
  FETCH_NBA_STARTING_LINEUP,
  FETCH_NBA_INJURIES,
  FETCH_NBA_LINES,
  FETCH_NBA_COMPLETED_TEAM_STATS
} from 'Constants'

// Summary
export const fetchNBASummary = createRoutine({
  prefix: FETCH_NBA_SUMMARY,
  api: getNBASummary,
  reducerKey: {
    primaryKey: 'nba',
    type: 'summary'
  },
  transform: 'replace'
})

export const clearNBASummary = () => ({
  type: CLEAR_NBA_SUMMARY
})

// Quarters
export const fetchNBAQuarters = createRoutine({
  prefix: FETCH_NBA_QUARTERS,
  api: getNBAQuarters,
  reducerKey: {
    primaryKey: 'nba',
    type: 'quarters'
  },
  transform: 'replace'
})

// Recent Games
export const fetchNBARecentGames = createRoutine({
  prefix: FETCH_NBA_RECENT_GAMES,
  api: getNBARecentGames,
  reducerKey: {
    primaryKey: 'nba',
    type: 'recentGames'
  },
  transform: 'replace'
})

// Starting Lineup
export const fetchNBAStartingLineup = createRoutine({
  prefix: FETCH_NBA_STARTING_LINEUP,
  api: getNBAStartingLineup,
  reducerKey: {
    primaryKey: 'nba',
    type: 'startingLineup'
  },
  transform: 'replace'
})

// Injuries
export const fetchNBAInjuries = createRoutine({
  prefix: FETCH_NBA_INJURIES,
  api: getNBAInjuries,
  reducerKey: {
    primaryKey: 'nba',
    type: 'injuries'
  },
  transform: 'replace'
})

// Vegas Lines
export const fetchNBALines = createRoutine({
  prefix: FETCH_NBA_LINES,
  api: getNBALines,
  reducerKey: {
    primaryKey: 'nba',
    type: 'lines'
  },
  transform: 'replace'
})

// Team Stats
export const fetchNBACompletedTeamStats = createRoutine({
  prefix: FETCH_NBA_COMPLETED_TEAM_STATS,
  api: getNBACompletedTeamStats,
  reducerKey: {
    primaryKey: 'nba',
    type: 'completedTeamStats'
  },
  transform: 'replace'
})
