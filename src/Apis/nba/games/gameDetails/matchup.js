import { axios } from 'Apis'

export const getNBAPreviousMeetings = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/previous_meetings`)
)
