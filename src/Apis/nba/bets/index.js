import { axios } from 'Apis'

export const getNBABets = () => (
  axios.get('/api/nba/v1/bets')
)

export const getNBAMatchBet = (matchId) => (
  axios.get(`/api/nba/v1/bets?match_id=${matchId}`)
)

export const postNBABet = (bet) => (
  axios.post('/api/nba/v1/bets', { bet })
)

export const editNBABet = (betId, bet) => (
  axios.put(`/api/nba/v1/bets/${betId}`, { bet })
)
