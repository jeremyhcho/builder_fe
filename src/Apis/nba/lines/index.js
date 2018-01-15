import { axios } from 'Apis'

export const getNBALines = (matchId) => (
  axios.get(`api/nba/v1/matches/${matchId}/lines`)
)
