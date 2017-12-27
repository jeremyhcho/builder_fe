import { combineReducers } from 'redux'

import games from './games'
import gameDetails from './games/gamesDetails'
import teams from './teams'

const nbaReducer = combineReducers({
  games,
  gameDetails,
  teams
})

export default nbaReducer
