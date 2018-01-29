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
      starter: 'minutes',
      bench: 'minutes'
    },
    home: {
      starter: 'minutes',
      bench: 'minutes'
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
    case CHANGE_SORT_STATS_KEY:
      return {
        ...state,
        sortStatsKey: {
          ...state.sortStatsKey,
          [action.teamType]: {
            ...state.sortStatsKey[action.teamType],
            [action.playerType]: action.stat
          }
        }
      }

    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        sortStatsKey: {
          away: {
            starter: 'minutes',
            bench: 'minutes'
          },
          home: {
            starter: 'minutes',
            bench: 'minutes'
          }
        }
      }

    default:
      return state
  }
}

export default nbaReducer
