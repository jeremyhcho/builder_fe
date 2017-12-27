import { combineReducers } from 'redux'

import overview from './overview'
import playerStats from './playerstats'
import teamStats from './teamstats'

const gameDetails = combineReducers({
  overview,
  teamStats,
  playerStats
})

export default gameDetails
