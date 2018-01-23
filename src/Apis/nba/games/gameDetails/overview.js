import { axios } from 'Apis'

// Summary
export const getSummaryData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/summary`)
)

// Quarters
export const getQuartersData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/quarters`)
)

// Recent Games
export const getRecentGamesData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/recent`)
)

// Starting Lineup
export const getStartingLineupData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/starters`)
)

// Injuries
export const getInjuriesData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/injuries`)
)

// Vegas Lines
export const getNBALines = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/lines`)
)
