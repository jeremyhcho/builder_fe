import { combineReducers } from 'redux'

import games from './games'
// import gameDetails from './games/gameDetails'
// import teams from './teams'
// import models from './models'

const nbaReducer = combineReducers({
  games,
  // gameDetails,
  // teams
})

export default nbaReducer
