import moment from 'moment'

import { getDateQuery } from 'Helpers'

// Constants
import { UPDATE_NBA_GAMES } from 'Constants'

const getCurrentDate = () => {
  if (getDateQuery(location.search)) {
    return moment(location.search.slice(6), 'YYYY-MM-DD')
  }

  return moment(moment().format('YYYY-MM-DD'))
}

const initialState = {
  now: getCurrentDate(),
  from: {},
  to: {}
}

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NBA_GAMES: {
      const { now, from, to } = action

      return {
        ...state,
        now,
        from,
        to
      }
    }

    default:
      return state
  }
}

export default dateReducer
