import { axios } from 'Apis'

export const getNBATrends = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/trends`)
)

export const getNBAPredictability = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/trends/predictability`)
)
