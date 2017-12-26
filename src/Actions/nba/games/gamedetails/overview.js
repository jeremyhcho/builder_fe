// Constants
import {
  FETCH_NBA_SUMMARY,
  FETCH_NBA_SUMMARY_SUCCESS,
  FETCH_NBA_QUARTERS,
  FETCH_NBA_QUARTERS_SUCCESS,
  FETCH_NBA_RECENT_GAMES,
  FETCH_NBA_RECENT_GAMES_SUCCESS,
  FETCH_NBA_STARTING_LINEUP,
  FETCH_NBA_STARTING_LINEUP_SUCCESS,
  FETCH_NBA_INJURIES,
  FETCH_NBA_INJURIES_SUCCESS
} from 'Constants'

// Summary
export const fetchNBASummary = (id) => ({
  type: FETCH_NBA_SUMMARY,
  id
})

export const fetchNBASummarySuccess = (summary) => ({
  type: FETCH_NBA_SUMMARY_SUCCESS,
  summary
})

// Quarters
export const fetchNBAQuarters = (id) => ({
  type: FETCH_NBA_QUARTERS,
  id
})

export const fetchNBAQuartersSuccess = (quarters) => ({
  type: FETCH_NBA_QUARTERS_SUCCESS,
  quarters
})

// Recent Games
export const fetchNBARecentGames = (id) => ({
  type: FETCH_NBA_RECENT_GAMES,
  id
})

export const fetchNBARecentGamesSuccess = (recentGames) => ({
  type: FETCH_NBA_RECENT_GAMES_SUCCESS,
  recentGames
})

// Starting Lineup
export const fetchNBAStartingLineup = (id) => ({
  type: FETCH_NBA_STARTING_LINEUP,
  id
})

export const fetchNBAStartingLineupSuccess = (startingLineup) => ({
  type: FETCH_NBA_STARTING_LINEUP_SUCCESS,
  startingLineup
})

// Injuries
export const fetchNBAInjuries = (id) => ({
  type: FETCH_NBA_INJURIES,
  id
})

export const fetchNBAInjuriesSuccess = (injuries) => ({
  type: FETCH_NBA_INJURIES_SUCCESS,
  injuries
})
