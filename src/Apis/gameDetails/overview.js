import { axios } from 'Apis'

// summary
export const getSummaryData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/summary`)
)
