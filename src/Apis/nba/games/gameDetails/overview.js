import { axios } from 'Apis'

// Summary
export const getNBASummary = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/summary`)
)

// Quarters
export const getNBAQuarters = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/quarters`)
)

// Recent Games
export const getNBARecentGames = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/recent`)
)

// Starting Lineup
export const getNBAStartingLineup = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/starters`)
)

// Injuries
export const getNBAInjuries = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/injuries`)
)

// Vegas Lines
export const getNBALines = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/lines`)
)

// Team Stats
export const getNBACompletedTeamStats = (awayTeamId, homeTeamId) => (
  axios.get('/api/nba/v1/teams/stats', {
    params: {
      team_ids: [awayTeamId, homeTeamId]
    }
  })
)
