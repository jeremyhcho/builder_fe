import { combineReducers } from 'redux'

import games from './games'
import gameDetails from './games/gamesDetails'
import teams from './teams'
import models from './models'
import lines from './lines'

const nbaReducer = combineReducers({
  games,
  gameDetails,
  teams,
  models,
  lines
})

export default nbaReducer
