import createRoutine from 'Routines'

// Apis
import {
  getNBATeamDetails,
  getNBATeamAts,
  getNBATeamSchedule,
  getNBATeamRoster
} from 'Apis'

// Constants
import {
  FETCH_NBA_TEAM_DETAILS,
  FETCH_NBA_TEAM_ATS,
  FETCH_NBA_TEAM_SCHEDULE,
  FETCH_NBA_TEAM_ROSTER
} from 'Constants'

export const fetchNBATeamDetails = createRoutine({
  prefix: FETCH_NBA_TEAM_DETAILS,
  api: getNBATeamDetails,
  reducerKey: ['nba', 'teamDetails'],
  transform: 'replace'
})

export const fetchNBATeamAts = createRoutine({
  prefix: FETCH_NBA_TEAM_ATS,
  api: getNBATeamAts,
  reducerKey: ['nba', 'teamAts'],
  transform: 'replace'
})

export const fetchNBATeamSchedule = createRoutine({
  prefix: FETCH_NBA_TEAM_SCHEDULE,
  api: getNBATeamSchedule,
  reducerKey: ['nba', 'teamSchedule'],
  transform: 'replace'
})

export const fetchNBATeamRoster = createRoutine({
  prefix: FETCH_NBA_TEAM_ROSTER,
  api: getNBATeamRoster,
  reducerKey: ['nba', 'teamRoster'],
  transform: 'replace'
})
