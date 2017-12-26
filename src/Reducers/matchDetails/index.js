import { combineReducers } from 'redux'

import overview from './overview'
// import models from './models'
import playerStats from './playerstats'
import teamStats from './teamstats'

const matchDetails = combineReducers({
  overview,
  teamStats,
  playerStats
  // models,
})

export default matchDetails
