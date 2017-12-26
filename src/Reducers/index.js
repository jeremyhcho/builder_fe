import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers
import auth from './auth'
import nbaTeams from './teams'
import { games, gameDetails } from './nba'

const rootReducer = combineReducers({
  auth,
  games,
  gameDetails,
  nbaTeams
  router: routerReducer,
  form: formReducer
})

export default rootReducer
