import { axios } from 'Apis'

// player stats
export const getNBAPlayerStats = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/player_stats`)
)
