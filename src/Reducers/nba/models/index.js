// Constants
import {
  CREATE_NBA_MODEL,
  CREATE_NBA_MODEL_SUCCESS,
  FETCH_NBA_MODELS,
  FETCH_NBA_MODELS_SUCCESS,
  DELETE_NBA_MODEL_SUCCESS,
  UPDATE_NBA_MODEL,
  UPDATE_NBA_MODEL_SUCCESS
} from 'Constants'

const initialState = {
  modelList: [],
  creatingModel: false,
  updatingModel: false,
  fetchedModels: false
}

const models = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NBA_MODEL:
      return { ...state, creatingModel: true }

    case CREATE_NBA_MODEL_SUCCESS:
      return {
        ...state,
        modelList: [...state.modelList, action.model.data],
        creatingModel: false
      }

    case FETCH_NBA_MODELS:
      return { ...state, fetchedModels: true }

    case FETCH_NBA_MODELS_SUCCESS:
      return {
        ...state,
        modelList: action.models.data,
        fetchedModels: false
      }

    case DELETE_NBA_MODEL_SUCCESS:
      return {
        ...state,
        modelList: state.modelList.filter(model => model.id !== action.id)
      }

    case UPDATE_NBA_MODEL:
      return { ...state, updatingModel: true }

    case UPDATE_NBA_MODEL_SUCCESS:
      return {
        ...state,
        modelList: state.modelList.map(model => {
          if (model.id !== action.newModel.data.id) return model
          return action.newModel.data
        }),
        updatingModel: false
      }

    default:
      return state
  }
}

export default models
