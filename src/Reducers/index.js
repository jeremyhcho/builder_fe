import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

// Reducers
import auth from './auth'
import nbaGames from './matches'
import matchDetails from './matchDetails'
import dates from './dates'

const rootReducer = combineReducers({
  auth,
  nbaGames,
  matchDetails,
  dates,
  router: routerReducer,
  form: formReducer
})

export default rootReducer
