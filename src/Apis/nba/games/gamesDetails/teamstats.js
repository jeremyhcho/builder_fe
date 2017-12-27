import { axios } from 'Apis'

// team stats
export const getTeamStatsData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/team_stats`)
)

// key differences
export const getKeyStatsData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/key_stats`)
)
