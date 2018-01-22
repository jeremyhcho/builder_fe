import { combineReducers } from 'redux'

import overview from './overview'
import playerStats from './playerStats'
import teamStats from './teamStats'
import models from './models'
import trends from './trends'

const gameDetails = combineReducers({
  overview,
  teamStats,
  playerStats,
  models,
  trends
})

export default gameDetails
