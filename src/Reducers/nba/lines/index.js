// Constants
import {
  FETCH_NBA_LINES,
  FETCH_NBA_LINES_FAIL,
  FETCH_NBA_LINES_SUCCESS
} from 'Constants'

const initialState = {
  lines: {},
  fetchingLines: false
}

const lines = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_LINES:
      return { ...state, fetchingLines: true }

    case FETCH_NBA_LINES_SUCCESS:
      return { ...state, lines: action.lines, fetchingLines: false }

    case FETCH_NBA_LINES_FAIL:
      return { ...state, fetchingLines: false }

    default:
      return state
  }
}

export default lines
