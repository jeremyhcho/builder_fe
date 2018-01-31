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

export const fetchNBAMatchesModels = createRoutine({
  prefix: FETCH_NBA_MATCHES_MODELS,
  api: getNBAMatchesModels,
  reducerKey: {
    primaryKey: 'nba',
    type: 'matchesModels'
  },
  transform: 'replace'
})

export const updateNBAMatchesModels = createRoutine({
  prefix: UPDATE_NBA_MATCHES_MODELS,
  api: putNBAMatchesModels,
  reducerKey: {
    primaryKey: 'nba',
    type: 'matchesModels'
  },
  transform: 'updateByIdAndChange'
})

export const fetchNBAPredictions = createRoutine({
  prefix: FETCH_NBA_MATCHES_MODELS_PREDICTION,
  api: getNBAPredictions,
  reducerKey: {
    primaryKey: 'nba',
    type: 'predictions'
  },
  transform: 'replace'
})

export const fetchNBAAggregateTotals = createRoutine({
  prefix: FETCH_NBA_AGGREGATE_TOTALS,
  api: getNBAAggregateTotals,
  reducerKey: {
    primaryKey: 'nba',
    type: 'aggregateTotals'
  },
  transform: 'replace'
})

export const fetchNBAAggregateSpreads = createRoutine({
  prefix: FETCH_NBA_AGGREGATE_SPREADS,
  api: getNBAAggregateSpreads,
  reducerKey: {
    primaryKey: 'nba',
    type: 'aggregateSpreads'
  },
  transform: 'replace'
})