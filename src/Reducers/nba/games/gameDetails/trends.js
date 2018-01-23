// Constants
import {
  FETCH_NBA_PREDICTABILITY,
  FETCH_NBA_PREDICTABILITY_SUCCESS,
  FETCH_NBA_PREDICTABILITY_FAIL
} from 'Constants'

const initialState = {
  predictability: {},
  fetchingPredictability: false
}

const trends = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_PREDICTABILITY:
      return { ...state, fetchingPredictability: true }

    case FETCH_NBA_PREDICTABILITY_SUCCESS:
      return {
        ...state,
        predictability: action.predictability.data,
        fetchingPredictability: false
      }

    case FETCH_NBA_PREDICTABILITY_FAIL:
      return {
        ...state,
        fetchingPredictability: false
      }

    default:
      return state
  }
}

export default trends
