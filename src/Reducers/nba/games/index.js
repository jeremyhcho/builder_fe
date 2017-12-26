import moment from 'moment'

// Constants
import {
  FETCH_NBA_GAMES_SUCCESS,
  PAGINATE_NBA_GAMES_SUCCESS,
  FETCH_NBA_GAMES,
  PAGINATE_NBA_GAMES
} from 'Constants'

const initialState = {
  gamesList: [],
  fetchingGames: false,
  paginatingGames: false,
  dates: {
    now: moment(moment().format('YYYY-MM-DD')),
    from: {},
    to: {}
  }
}

const games = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_GAMES: {
      const { now, from, to } = action
      return {
        ...state,
        fetchingGames: true,
        dates: { now, from, to }
      }
    }

    case PAGINATE_NBA_GAMES:
      return { ...state, paginatingGames: true }

    case FETCH_NBA_GAMES_SUCCESS:
      return {
        ...state,
        fetchingGames: false,
        gamesList: action.games.data.map(match => ({
          ...match, date: moment(new Date(match.date))
        }))
      }
    case PAGINATE_NBA_GAMES_SUCCESS: {
      let newGames

      if (action.paginateType === 'previous') {
        newGames = action.games.data.concat(state.gamesList)
      } else {
        newGames = state.gamesList.concat(action.games.data)
      }
      return {
        ...state,
        paginatingGames: false,
        gamesList: newGames.map(game => ({
          ...game, date: moment(new Date(game.date))
        }))
      }
    }

    default:
      return state
  }
}

export default games
