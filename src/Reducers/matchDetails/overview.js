// Constants
import {
  FETCH_NBA_SUMMARY,
  RECEIVE_NBA_SUMMARY
} from 'Constants'

const initialState = {
  summary: {},
  fetchingSummary: false,
}

const overview = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_SUMMARY:
      return { ...state, fetchingSummary: true }

    case RECEIVE_NBA_SUMMARY:
      return {
        ...state,
        fetchingSummary: false,
        summary: action.summary.data
      }

    default:
      return state
  }
}

export default overview
