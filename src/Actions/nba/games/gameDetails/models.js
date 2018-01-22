// Constants
import {
  FETCH_NBA_MATCHES_MODELS,
  UPDATE_NBA_MATCHES_MODELS,
  FETCH_NBA_MATCHES_MODELS_PREDICTION,
  FETCH_NBA_AGGREGATE_TOTALS,
  FETCH_NBA_AGGREGATE_SPREADS
} from 'Constants'

export const fetchNBAMatchesModels = (matchId) => ({
  type: FETCH_NBA_MATCHES_MODELS,
  matchId
})

export const updateNBAMatchesModels = (modelId, newStatus) => ({
  type: UPDATE_NBA_MATCHES_MODELS,
  modelId,
  newStatus
})

export const fetchNBAMatchesModelsPrediction = (matchModelId) => ({
  type: FETCH_NBA_MATCHES_MODELS_PREDICTION,
  matchModelId
})

export const fetchNBAAggregateTotals = (matchId) => ({
  type: FETCH_NBA_AGGREGATE_TOTALS,
  matchId
})

export const fetchNBAAggregateSpreads = (matchId) => ({
  type: FETCH_NBA_AGGREGATE_SPREADS,
  matchId
})
