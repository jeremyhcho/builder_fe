import moment from 'moment'

import { getDateQuery } from 'Helpers'

// Constants
import { UPDATE_NBA_GAMES } from 'Constants'

const getCurrentDate = () => {
  if (getDateQuery(location.search)) {
    return location.search.slice(6)
  }

  return moment().format('YYYY-MM-DD')
}

const initialState = {
  selectedDate: getCurrentDate()
}

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NBA_GAMES:
      return { ...state, selectedDate: action.date }

    default:
      return state
  }
}

export default dateReducer
