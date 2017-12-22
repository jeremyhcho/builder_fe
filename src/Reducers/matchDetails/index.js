import { combineReducers } from 'redux'

import overview from './overview'
// import models from './models'
// import playerStats from './playerStats'
import teamStats from './teamstats'

const matchDetails = combineReducers({
  overview,
  teamStats,
  // models,
  // playerStats,
})

export default matchDetails
