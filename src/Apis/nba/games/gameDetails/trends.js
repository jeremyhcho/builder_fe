import { axios } from 'Apis'

export const getNBAPredictability = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/trends/predictability`)
)
