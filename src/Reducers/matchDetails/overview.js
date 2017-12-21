// Constants
import {
  RECEIVE_NBA_SUMMARY
} from 'Constants'

const initialState = {
  summary: null,
}

const overview = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_NBA_SUMMARY:
      return {
        ...state,
        summary: action.summary.data
      }

    default:
      return state
  }
}

export default overview
