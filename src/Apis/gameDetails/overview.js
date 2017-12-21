import { axios } from 'Apis'

// summary
export const getSummaryData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/summary`)
)

// quarters
export const getQuartersData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/quarters`)
)

// recent games
export const getRecentGamesData = (id) => (
  axios.get(`/api/nba/v1/matches/${id}/recent`)
)
