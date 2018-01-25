import { axios } from 'Apis'

// team stats
export const getNBATeamStats = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/team_stats`)
)

// key differences
export const getNBAKeyStats = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/key_stats`)
)
