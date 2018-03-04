import { axios } from 'Apis'

export const getNBABets = () => (
  axios.get('/api/nba/v1/bets')
)
