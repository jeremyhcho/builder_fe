import { createRoutine } from 'Routines'

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
  reducerKey: ['nba', 'predictability'],
  transform: 'replace'
})

export const fetchNBATrends = createRoutine({
  prefix: FETCH_NBA_TRENDS,
  api: getNBATrends,
  reducerKey: ['nba', 'trends'],
  transform: 'replace'
})
