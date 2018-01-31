import moment from 'moment'

// Constants
import {
  FETCH_NBA_GAMES,
  CHANGE_SORT_STATS_KEY
} from 'Constants'

const initialState = {
  dates: {
    now: moment(moment().format('YYYY-MM-DD')),
    from: {},
    to: {}
  },
  sortStatsKey: {
    away: {
      starter: { stat: 'minutes', ascending: true },
      bench: { stat: 'minutes', ascending: true }
    },
    home: {
      starter: { stat: 'minutes', ascending: true },
      bench: { stat: 'minutes', ascending: true },
    }
  }
}

const nbaReducer = (state = initialState, action) => {
  switch (action.type) {
    // DateInput
    case FETCH_NBA_GAMES: {
      const { now, from, to } = action.payload[0]

      return {
        ...state,
        dates: { now, from, to }
      }
    }

    // playersStats => teamPlayers
    case CHANGE_SORT_STATS_KEY: {
      const { playerType, teamType, stat } = action

      let sortBy = state.sortStatsKey[teamType][playerType].ascending
      if (state.sortStatsKey[teamType][playerType].stat === stat) {
        sortBy = !state.sortStatsKey[teamType][playerType].ascending
      }

      return {
        ...state,
        sortStatsKey: {
          ...state.sortStatsKey,
          [teamType]: {
            ...state.sortStatsKey[teamType],
            [playerType]: {
              stat,
              ascending: sortBy
            }
          }
        }
      }
    }


    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        sortStatsKey: initialState.sortStatsKey
      }

    default:
      return state
  }
}

export default nbaReducer
