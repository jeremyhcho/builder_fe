import { axios } from 'Apis'

export const getNBATeams = () => (
  axios.get('/api/nba/v1/teams')
)
