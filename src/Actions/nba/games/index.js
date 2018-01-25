import moment from 'moment'
import createRoutine from 'Routines'

// Constants
import { FETCH_NBA_GAMES } from 'Constants'

// Apis
import { getNBAGames } from 'Apis'

export const fetchNBAGames = createRoutine(
  FETCH_NBA_GAMES,
  getNBAGames,
  {
    reducerKey: {
      sport: 'nba',
      type: 'games'
    },
    transform: (response) => (
      response.map(game => ({
        ...game, date: moment(new Date(game.date))
      }))
    )
  }
)
