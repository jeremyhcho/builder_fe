import { axios } from 'Apis'

// team stats
export const getTeamStatsData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/team_stats`)
)
