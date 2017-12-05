import { axios } from 'Apis'

export const fetchMatches = (params) => (
  axios.post('/api/nba/v1/matches', params)
)
