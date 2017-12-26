import { axios } from 'Apis'

export const getNBAGames = (params) => (
  axios.get('/api/nba/v1/matches', {
    params
  })
)
