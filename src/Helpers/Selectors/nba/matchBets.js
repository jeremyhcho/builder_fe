import { createSelector } from 'reselect'

const getMatchBets = (routines) => routines.nba.matchBets
const getMatchId = (routines, gameId) => gameId

const getNBAMatchBet = () => {
  return createSelector(
    getMatchBets,
    getMatchId,
    (matchBets, matchId) => {
      if (!matchBets || !Object.keys(matchBets).length) return null

      return matchBets[matchId]
    }
  )
}

export default getNBAMatchBet
