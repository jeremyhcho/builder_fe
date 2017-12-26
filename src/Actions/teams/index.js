import { FETCH_NBA_TEAMS, RECEIVE_NBA_TEAMS } from 'Constants'

export const fetchNBATeams = () => ({
  type: FETCH_NBA_TEAMS
})

export const receiveNBATeams = (teams) => ({
  type: RECEIVE_NBA_TEAMS,
  teams
})
