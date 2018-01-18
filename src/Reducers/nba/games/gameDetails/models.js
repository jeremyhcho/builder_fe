// Constants
import {
  FETCH_NBA_MATCHES_MODELS,
  FETCH_NBA_MATCHES_MODELS_SUCCESS,
  FETCH_NBA_MATCHES_MODELS_FAIL,
  UPDATE_NBA_MATCHES_MODELS_SUCCESS,
  CHANGE_SELECTED_MODEL
} from 'Constants'

const initialState = {
  selectedModel: {},
  matchesModels: [],
  fetchingMatchesModels: false
}

const models = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_MODEL:
      return { ...state, selectedModel: action.model }

    case FETCH_NBA_MATCHES_MODELS:
      return { ...state, fetchingMatchesModels: true }

    case FETCH_NBA_MATCHES_MODELS_SUCCESS:
      return {
        ...state,
        matchesModels: action.matchesModels.data,
        selectedModel: action.matchesModels.data.find(model => model.status === 'ACTIVE') || action.matchesModels.data[0],
        fetchingMatchesModels: false
      }

    case UPDATE_NBA_MATCHES_MODELS_SUCCESS:
      return {
        ...state,
        matchesModels: state.matchesModels.map(model => {
          if (model.id === action.matchesModels.data.id) return action.matchesModels.data
          return model
        })
      }

    case FETCH_NBA_MATCHES_MODELS_FAIL:
      return { ...state, fetchingMatchesModels: false }

    default:
      return state
  }
}

export default models
