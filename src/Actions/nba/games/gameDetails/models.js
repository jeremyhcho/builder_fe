import { createRoutine } from 'Routines'

// Apis
import {
  getPredictions,
  putNBAMatchesModels,
  getPrediction,
  getNBAAggregateTotals,
  getNBAAggregateSpreads
} from 'Apis'

// Constants
import {
  FETCH_NBA_PREDICTIONS,
  UPDATE_NBA_MATCHES_MODELS,
  FETCH_NBA_PREDICTION,
  FETCH_NBA_AGGREGATE_TOTALS,
  FETCH_NBA_AGGREGATE_SPREADS
} from 'Constants'

export const fetchNBAPredictions = createRoutine({
  prefix: FETCH_NBA_PREDICTIONS,
  api: getPredictions,
  reducerKey: ['nba', 'predictions'],
  transform: 'replace'
})

export const updateNBAMatchesModels = createRoutine({
  prefix: UPDATE_NBA_MATCHES_MODELS,
  api: putNBAMatchesModels,
  reducerKey: ['nba', 'matchesModels'],
  transform: 'updateByIdAndChange'
})

export const fetchNBAPrediction = createRoutine({
  prefix: FETCH_NBA_PREDICTION,
  api: getPrediction,
  reducerKey: ['nba', 'prediction'],
  transform: 'replace'
})

export const fetchNBAAggregateTotals = createRoutine({
  prefix: FETCH_NBA_AGGREGATE_TOTALS,
  api: getNBAAggregateTotals,
  reducerKey: ['nba', 'aggregateTotals'],
  transform: 'replace'
})

export const fetchNBAAggregateSpreads = createRoutine({
  prefix: FETCH_NBA_AGGREGATE_SPREADS,
  api: getNBAAggregateSpreads,
  reducerKey: ['nba', 'aggregateSpreads'],
  transform: 'replace'
})
