// Constants
import {
  FETCH_NBA_SUMMARY,
  RECEIVE_NBA_SUMMARY,
  FETCH_NBA_QUARTERS,
  RECEIVE_NBA_QUARTERS,
  FETCH_NBA_RECENT_GAMES,
  RECEIVE_NBA_RECENT_GAMES
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
