// Constants
import {
  FETCH_NBA_SUMMARY,
  RECEIVE_NBA_SUMMARY,
  FETCH_NBA_QUARTERS,
  RECEIVE_NBA_QUARTERS,
  FETCH_NBA_RECENT_GAMES,
  RECEIVE_NBA_RECENT_GAMES,
  FETCH_NBA_STARTING_LINEUP,
  RECEIVE_NBA_STARTING_LINEUP
} from 'Constants'

// Summary
export const fetchNBASummary = (id) => ({
  type: FETCH_NBA_SUMMARY,
  id
})

export const receiveNBASummary = (summary) => ({
  type: RECEIVE_NBA_SUMMARY,
  summary
})

// Quarters
export const fetchNBAQuarters = (id) => ({
  type: FETCH_NBA_QUARTERS,
  id
})

export const receiveNBAQuarters = (quarters) => ({
  type: RECEIVE_NBA_QUARTERS,
  quarters
})

// Recent Games
export const fetchNBARecentGames = (id) => ({
  type: FETCH_NBA_RECENT_GAMES,
  id
})

export const receiveNBARecentGames = (recentGames) => ({
  type: RECEIVE_NBA_RECENT_GAMES,
  recentGames
})

// Starting Lineup
export const fetchNBAStartingLineup = (id) => ({
  type: FETCH_NBA_STARTING_LINEUP,
  id
})

export const receiveNBAStartingLineup = (startingLineup) => ({
  type: RECEIVE_NBA_STARTING_LINEUP,
  startingLineup
})
