import { combineReducers } from 'redux'

import overview from './overview'
// import models from './models'
// import playerStats from './playerStats'
// import teamStats from './teamStats'

const matchDetails = combineReducers({
  overview
  // models,
  // playerStats,
  // teamStats
})

export default matchDetails
