import {
  FETCH_NBA_TEAM_DETAILS,
  RECEIVE_NBA_TEAM_DETAILS
} from 'Constants'

export const fetchNBATeamDetails = (id) => ({
  type: FETCH_NBA_TEAM_DETAILS,
  id
})

export const receiveNBATeamDetails = (teamDetails) => ({
  type: RECEIVE_NBA_TEAM_DETAILS,
  teamDetails
})
