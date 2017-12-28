// Constants
import {
  CREATE_NBA_MODEL,
  CREATE_NBA_MODEL_SUCCESS,
  FETCH_NBA_MODELS_SUCCESS,
  DELETE_NBA_MODEL_SUCCESS
} from 'Constants'

const initialState = {
  modelList: [],
  creatingModel: false,
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

    case FETCH_NBA_MODELS_SUCCESS:
      return {
        ...state,
        modelList: action.models.data
      }

    case DELETE_NBA_MODEL_SUCCESS: {
      return {
        ...state,
        modelList: state.modelList.filter(model => model.id !== action.id)
      }
    }

    default:
      return state
  }
}

export default models
