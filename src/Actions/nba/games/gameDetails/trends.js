import createRoutine from 'Routines'

// Apis
import {
  getNBAPredictability
} from 'Apis'

// Constants
import {
  FETCH_NBA_PREDICTABILITY
} from 'Constants'

export const fetchNBAPredictability = createRoutine(
  FETCH_NBA_PREDICTABILITY,
  getNBAPredictability,
  {
    reducerKey: {
      sport: 'nba',
      type: 'predictability'
    },
    transform: 'replace'
  }
)
