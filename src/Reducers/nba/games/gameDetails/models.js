// Constants
import {
  FETCH_NBA_MATCHES_MODELS,
  FETCH_NBA_MATCHES_MODELS_SUCCESS,
  FETCH_NBA_MATCHES_MODELS_FAIL,
  FETCH_NBA_MATCHES_MODELS_PREDICTION,
  FETCH_NBA_MATCHES_MODELS_PREDICTION_SUCCESS,
  FETCH_NBA_MATCHES_MODELS_PREDICTION_FAIL,
  UPDATE_NBA_MATCHES_MODELS_SUCCESS,
  FETCH_NBA_AGGREGATE_TOTALS,
  FETCH_NBA_AGGREGATE_TOTALS_SUCCESS,
  FETCH_NBA_AGGREGATE_TOTALS_FAIL,
  FETCH_NBA_AGGREGATE_SPREADS,
  FETCH_NBA_AGGREGATE_SPREADS_SUCCESS,
  FETCH_NBA_AGGREGATE_SPREADS_FAIL
} from 'Constants'

const initialState = {
  selectedModel: {},
  matchesModels: [],
  aggregateTotals: {},
  aggregateSpreads: {},
  fetchingMatchesModels: false,
  fetchingPredictions: false,
  fetchingAggregateTotals: false,
  fetchingAggregateSpreads: false
}

const models = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_MATCHES_MODELS:
      return { ...state, fetchingMatchesModels: true, fetchingPredictions: true }

    case FETCH_NBA_MATCHES_MODELS_SUCCESS:
      return {
        ...state,
        matchesModels: action.matchesModels.data,
        fetchingMatchesModels: false
      }

    case FETCH_NBA_MATCHES_MODELS_FAIL:
      return { ...state, fetchingMatchesModels: false }

    case UPDATE_NBA_MATCHES_MODELS_SUCCESS:
      return {
        ...state,
        matchesModels: state.matchesModels.map(matchModel => {
          if (matchModel.id === action.matchesModels.data.id) {
            return { ...matchModel, status: action.matchesModels.data.status }
          }
          return matchModel
        })
      }

    case FETCH_NBA_MATCHES_MODELS_PREDICTION:
      return { ...state, fetchingPredictions: true }

    case FETCH_NBA_MATCHES_MODELS_PREDICTION_SUCCESS:
      return {
        ...state,
        selectedModel: action.modelPrediction.data,
        fetchingPredictions: false
      }

    case FETCH_NBA_MATCHES_MODELS_PREDICTION_FAIL:
      return { ...state, fetchingPredictions: false }

    case FETCH_NBA_AGGREGATE_TOTALS:
      return { ...state, fetchingAggregateTotals: true }

    case FETCH_NBA_AGGREGATE_TOTALS_SUCCESS:
      return {
        ...state,
        aggregateTotals: action.aggregateTotals.data,
        fetchingAggregateTotals: false
      }

    case FETCH_NBA_AGGREGATE_TOTALS_FAIL:
      return { ...state, fetchingAggregateTotals: false }

    case FETCH_NBA_AGGREGATE_SPREADS:
      return { ...state, fetchingAggregateSpreads: true }

    case FETCH_NBA_AGGREGATE_SPREADS_SUCCESS:
      return {
        ...state,
        aggregateSpreads: action.aggregateSpreads.data,
        fetchingAggregateSpreads: false
      }

    case FETCH_NBA_AGGREGATE_SPREADS_FAIL:
      return { ...state, fetchingaggregateSpreads: false }

    default:
      return state
  }
}

export default models
