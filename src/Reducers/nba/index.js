import moment from 'moment'

// Constants
import {
  UPDATE_NBA_GAMES,
  CHANGE_SORT_STATS_KEY,
  OPEN_BET_MODAL,
  CLOSE_BET_MODAL,
  SUBMIT_EDIT_BET,
  CLOSE_EDIT_BET
} from 'Constants'

// Helpers
import { getDateQuery } from 'Helpers'

const getCurrentDate = () => {
  if (getDateQuery(location.search)) {
    return moment(location.search.slice(6))
  }

  return moment(moment().format('YYYY-MM-DD'))
}

const initialState = {
  dates: {
    now: getCurrentDate(),
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
  },
  bets: {
    openBetModal: false,
    modalBetId: 0,
    submitEditBet: false
  }
}

const nbaReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NBA_GAMES: {
      const { now, from, to } = action

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

    case OPEN_BET_MODAL:
      return { ...state, bets: { openBetModal: true, modalBetId: action.betId } }

    case CLOSE_BET_MODAL:
      return { ...state, bets: { openBetModal: false, modalBetId: 0 } }

    case SUBMIT_EDIT_BET:
      return { ...state, bets: { ...state.bets, submitEditBet: true } }

    case CLOSE_EDIT_BET:
      return { ...state, bets: { ...state.bets, submitEditBet: false } }

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
