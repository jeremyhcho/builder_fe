import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers
// import auth from './auth'
// import nbaGames from './matches'
// import matchDetails from './matchDetails'
//
// const rootReducer = combineReducers({
//   auth,
//   nbaGames,
//   matchDetails,
//   router: routerReducer,
//   form: formReducer
// })
//
// export default rootReducer

// Reducers
import auth from './auth'
import { games, gameDetails } from './nba'

const rootReducer = combineReducers({
  auth,
  games,
  gameDetails,
  router: routerReducer,
  form: formReducer
})

export default rootReducer
