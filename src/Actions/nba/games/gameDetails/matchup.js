import createRoutine from 'Routines'

// Apis
import {
  getNBAPreviousMeetings,
  getNBASummary
} from 'Apis'

// Constants
import {
  FETCH_NBA_PREVIOUS_MEETINGS,
  FETCH_NBA_MATCHUP
} from 'Constants'

export const fetchNBAPreviousMeetings = createRoutine({
  prefix: FETCH_NBA_PREVIOUS_MEETINGS,
  api: getNBAPreviousMeetings,
  reducerKey: {
    primaryKey: 'nba',
    type: 'previousMeetings'
  },
  transform: 'replace'
})

export const fetchNBAMatchup = createRoutine({
  prefix: FETCH_NBA_MATCHUP,
  api: getNBASummary,
  reducerKey: {
    primaryKey: 'nba',
    type: 'matchup'
  },
  transform: 'replace'
})
