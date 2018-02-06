import { axios } from 'Apis'

export const getNBATeamDetails = (teamId) => (
  axios.get(`/api/nba/v1/teams/${teamId}`)
)

export const getNBATeamAts = (teamId) => (
  axios.get(`/api/nba/v1/teams/${teamId}/ats`)
)

export const getNBATeamSchedule = (teamId) => (
  axios.get(`/api/nba/v1/teams/${teamId}/schedule`)
)

export const getNBATeamRoster = (teamId) => (
  axios.get(`/api/nba/v1/teams/${teamId}/roster`)
)
