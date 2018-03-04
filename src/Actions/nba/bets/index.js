import { createRoutine } from 'Routines'

// Constants
import { FETCH_NBA_BETS } from 'Constants'

// Apis
import { getNBABets } from 'Apis'

export const fetchNBABets = createRoutine({
  prefix: FETCH_NBA_BETS,
  api: getNBABets,
  reducerKey: ['nba', 'bets'],
  transform: 'replace'
})
