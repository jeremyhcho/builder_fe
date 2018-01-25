import createRoutine from 'Routines'

// Apis
import {
  getNBAMatchesModels,
  putNBAMatchesModels,
  getNBAPredictions,
  getNBAAggregateTotals,
  getNBAAggregateSpreads
} from 'Apis'

// Constants
import {
  FETCH_NBA_MATCHES_MODELS,
  UPDATE_NBA_MATCHES_MODELS,
  FETCH_NBA_MATCHES_MODELS_PREDICTION,
  FETCH_NBA_AGGREGATE_TOTALS,
  FETCH_NBA_AGGREGATE_SPREADS
} from 'Constants'

export const fetchNBAMatchesModels = createRoutine(
  FETCH_NBA_MATCHES_MODELS,
  getNBAMatchesModels,
  {
    reducerKey: {
      sport: 'nba',
      type: 'matchesModels'
    },
    transform: 'replace'
  }
)

export const updateNBAMatchesModels = createRoutine(
  UPDATE_NBA_MATCHES_MODELS,
  putNBAMatchesModels,
  {
    reducerKey: {
      sport: 'nba',
      type: 'matchesModels'
    },
    transform: 'updateById'
  }
)

export const fetchNBAPredictions = createRoutine(
  FETCH_NBA_MATCHES_MODELS_PREDICTION,
  getNBAPredictions,
  {
    reducerKey: {
      sport: 'nba',
      type: 'predictions'
    },
    transform: 'replace'
  }
)

export const fetchNBAAggregateTotals = createRoutine(
  FETCH_NBA_AGGREGATE_TOTALS,
  getNBAAggregateTotals,
  {
    reducerKey: {
      sport: 'nba',
      type: 'aggregateTotals'
    },
    transform: 'replace'
  }
)

export const fetchNBAAggregateSpreads = createRoutine(
  FETCH_NBA_AGGREGATE_SPREADS,
  getNBAAggregateSpreads,
  {
    reducerKey: {
      sport: 'nba',
      type: 'aggregateSpreads'
    },
    transform: 'replace'
  }
)
