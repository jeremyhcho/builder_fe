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

export const fetchNBAPredictability = createRoutine(
  FETCH_NBA_PREDICTABILITY,
  getNBAPredictability,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'predictability'
    },
    transform: 'replace'
  }
)

export const fetchNBATrends = createRoutine(
  FETCH_NBA_TRENDS,
  getNBATrends,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'trends'
    },
    transform: 'replace'
  }
)
