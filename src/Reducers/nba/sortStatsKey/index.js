// Constants
import { CHANGE_SORT_STATS_KEY } from 'Constants'

const initialState = {
  away: {
    starter: { stat: 'minutes', ascending: true },
    bench: { stat: 'minutes', ascending: true }
  },
  home: {
    starter: { stat: 'minutes', ascending: true },
    bench: { stat: 'minutes', ascending: true },
  }
}

const sortStatsKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SORT_STATS_KEY: {
      const { playerType, teamType, stat } = action

      let sortBy = state[teamType][playerType].ascending
      if (state[teamType][playerType].stat === stat) {
        sortBy = !state[teamType][playerType].ascending
      }

      return {
        ...state,
        [teamType]: {
          ...state[teamType],
          [playerType]: {
            stat,
            ascending: sortBy
          }
        }
      }
    }

    default:
      return state
  }
}

export default sortStatsKeyReducer
