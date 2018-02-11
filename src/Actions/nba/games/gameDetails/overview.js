import { createRoutine } from 'Routines'

// Apis
import {
  getNBASummary,
  getNBAQuarters,
  getNBARecentGames,
  getNBAStartingLineup,
  getNBAInjuries,
  getNBALines,
  getNBATeamStats
} from 'Apis'

// Constants
import {
  FETCH_NBA_SUMMARY,
  FETCH_NBA_QUARTERS,
  FETCH_NBA_RECENT_GAMES,
  FETCH_NBA_STARTING_LINEUP,
  FETCH_NBA_INJURIES,
  FETCH_NBA_LINES,
  FETCH_NBA_TEAM_STATS
} from 'Constants'

// Summary
export const fetchNBASummary = createRoutine({
  prefix: FETCH_NBA_SUMMARY,
  api: getNBASummary,
  reducerKey: ['nba', 'summary'],
  transform: 'replace'
})

// Quarters
export const fetchNBAQuarters = createRoutine({
  prefix: FETCH_NBA_QUARTERS,
  api: getNBAQuarters,
  reducerKey: ['nba', 'quarters'],
  transform: 'replace'
})

// Recent Games
export const fetchNBARecentGames = createRoutine({
  prefix: FETCH_NBA_RECENT_GAMES,
  api: getNBARecentGames,
  reducerKey: ['nba', 'recentGames'],
  transform: 'replace'
})

// Starting Lineup
export const fetchNBAStartingLineup = createRoutine({
  prefix: FETCH_NBA_STARTING_LINEUP,
  api: getNBAStartingLineup,
  reducerKey: ['nba', 'startingLineup'],
  transform: 'replace'
})

// Injuries
export const fetchNBAInjuries = createRoutine({
  prefix: FETCH_NBA_INJURIES,
  api: getNBAInjuries,
  reducerKey: ['nba', 'injuries'],
  transform: 'replace'
})

// Vegas Lines
export const fetchNBALines = createRoutine({
  prefix: FETCH_NBA_LINES,
  api: getNBALines,
  reducerKey: ['nba', 'lines'],
  transform: 'replace'
})

// Team Stats
export const fetchNBATeamStats = createRoutine({
  prefix: FETCH_NBA_TEAM_STATS,
  api: getNBATeamStats,
  reducerKey: ['nba', 'teamStats'],
  transform: 'replace'
})
