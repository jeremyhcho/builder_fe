import createRoutine from 'Routines'

// Apis
import {
  getNBAPredictability,
  getNBATrends
} from 'Apis'

// Constants
import {
  FETCH_NBA_PREDICTABILITY,
  FETCH_NBA_TRENDS
} from 'Constants'

export const fetchNBAPredictability = createRoutine({
  prefix: FETCH_NBA_PREDICTABILITY,
  api: getNBAPredictability,
  reducerKey: {
    primaryKey: 'nba',
    type: 'predictability'
  },
  transform: 'replace'
})

export const fetchNBATrends = createRoutine({
  prefix: FETCH_NBA_TRENDS,
  api: getNBATrends,
  reducerKey: {
    primaryKey: 'nba',
    type: 'trends'
  },
  transform: 'replace'
})
