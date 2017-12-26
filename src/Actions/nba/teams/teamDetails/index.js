import {
  FETCH_NBA_TEAM_DETAILS,
  FETCH_NBA_TEAM_DETAILS_SUCCESS
} from 'Constants'

export const fetchNBATeamDetails = (id) => ({
  type: FETCH_NBA_TEAM_DETAILS,
  id
})

export const fetchNBATeamDetailsSuccess = (teamDetails) => ({
  type: FETCH_NBA_TEAM_DETAILS_SUCCESS,
  teamDetails
})
