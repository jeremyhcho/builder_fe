// Constants
import {
  FETCH_NBA_TEAMS,
  FETCH_NBA_TEAMS_SUCCESS
} from 'Constants'

export const fetchNBATeams = () => ({
  type: FETCH_NBA_TEAMS
})

export const fetchNBATeamsSuccess = (teams) => ({
  type: FETCH_NBA_TEAMS_SUCCESS,
  teams
})
