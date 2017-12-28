// Constants
import {
  CREATE_NBA_MODEL,
  CREATE_NBA_MODEL_SUCCESS,
  FETCH_NBA_MODELS,
  FETCH_NBA_MODELS_SUCCESS,
  DELETE_NBA_MODEL,
  DELETE_NBA_MODEL_SUCCESS
} from 'Constants'

export const createNBAModel = (model) => ({
  type: CREATE_NBA_MODEL,
  model
})

export const createNBAModelSuccess = (model) => ({
  type: CREATE_NBA_MODEL_SUCCESS,
  model
})

export const fetchNBAModels = () => ({
  type: FETCH_NBA_MODELS
})

export const fetchNBAModelsSuccess = (models) => ({
  type: FETCH_NBA_MODELS_SUCCESS,
  models
})

export const deleteNBAModel = (id) => ({
  type: DELETE_NBA_MODEL,
  id
})

export const deleteNBAModelSuccess = (id) => ({
  type: DELETE_NBA_MODEL_SUCCESS,
  id
})
