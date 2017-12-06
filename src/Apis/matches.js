import { axios } from 'Apis'

export const getNBAData = (params) => (
  axios.get('/api/nba/v1/matches', {
    params
  })
)
