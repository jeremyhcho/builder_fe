import { combineReducers } from 'redux'

// Reducers
import bets from './bets'
import dates from './dates'
import sortStatsKey from './sortStatsKey'

const nbaReducer = combineReducers({
  bets,
  dates,
  sortStatsKey
})

export default nbaReducer
