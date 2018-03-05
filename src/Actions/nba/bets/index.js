import { createRoutine } from 'Routines'

// Constants
import {
  FETCH_NBA_BETS,
  FETCH_NBA_MATCH_BET,
  CREATE_NBA_BET,
  UPDATE_NBA_BET,
  OPEN_BET_MODAL,
  CLOSE_BET_MODAL
} from 'Constants'

// Apis
import {
  getNBABets,
  getNBAMatchBet,
  postNBABet,
  editNBABet
} from 'Apis'

// Actions
import { openSnackbar } from 'Actions'

export const fetchNBABets = createRoutine({
  prefix: FETCH_NBA_BETS,
  api: getNBABets,
  reducerKey: ['nba', 'bets'],
  transform: 'replace'
})

export const fetchNBAMatchBet = createRoutine({
  prefix: FETCH_NBA_MATCH_BET,
  api: getNBAMatchBet,
  reducerKey: ['nba', 'matchBets'],
  transform: (response, stateKey, payload) => ({
    ...stateKey,
    [payload[0]]: response
  })
})

export const createNBABet = createRoutine({
  prefix: CREATE_NBA_BET,
  api: postNBABet,
  reducerKey: ['nba', 'matchBets'],
  onSuccess: () => openSnackbar('Bet created', 3000),
  transform: (response, stateKey) => {
    const matchId = response.match.id

    return {
      ...stateKey,
      [matchId]: [...stateKey[matchId], response]
    }
  }
})

export const updateNBABet = createRoutine({
  prefix: UPDATE_NBA_BET,
  api: editNBABet,
  reducerKey: ['nba', 'matchBets'],
  onSuccess: () => openSnackbar('Bet updated', 3000),
  transform: (response, stateKey) => {
    const matchId = response.match.id

    return {
      ...stateKey,
      [matchId]: stateKey[matchId].map(bet => {
        if (bet.bet_type === response.bet_type) {
          return response
        }

        return bet
      })
    }
  }
})

export const openBetModal = (betId) => ({
  type: OPEN_BET_MODAL,
  betId
})

export const closeBetModal = () => ({
  type: CLOSE_BET_MODAL
})
