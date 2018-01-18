// Constants
import {
  CHANGE_SELECTED_MODEL,
  FETCH_NBA_MATCHES_MODELS,
  UPDATE_NBA_MATCHES_MODELS
} from 'Constants'


export const changeSelectedModel = (model) => ({
  type: CHANGE_SELECTED_MODEL,
  model
})

export const fetchNBAMatchesModels = (matchId) => ({
  type: FETCH_NBA_MATCHES_MODELS,
  matchId
})

export const updateNBAMatchesModels = (modelId, newStatus) => ({
  type: UPDATE_NBA_MATCHES_MODELS,
  modelId,
  newStatus
})
