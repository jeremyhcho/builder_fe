import { axios } from 'Apis'

export const getNBATeamsData = () => (
  axios.get('/api/nba/v1/teams')
)
