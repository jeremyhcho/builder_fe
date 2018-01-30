import moment from 'moment'
import createRoutine from 'Routines'

// Constants
import { FETCH_NBA_GAMES, CLEAR_NBA_ROUTINES } from 'Constants'

// Apis
import { getNBAGames } from 'Apis'

export const fetchNBAGames = createRoutine({
  prefix: FETCH_NBA_GAMES,
  api: getNBAGames,
  reducerKey: { primaryKey: 'nba', type: 'games' },
  transform: (response) => (
    response.map(game => ({
      ...game, date: moment(new Date(game.date))
    }))
  )
})

export const clearNBARoutines = () => ({
  type: CLEAR_NBA_ROUTINES
})
