import { combineReducers } from 'redux'

import overview from './overview'
import playerStats from './playerStats'
import teamStats from './teamStats'
import models from './models'

const gameDetails = combineReducers({
  overview,
  teamStats,
  playerStats,
  models
})

export default gameDetails
