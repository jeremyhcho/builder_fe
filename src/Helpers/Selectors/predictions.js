import { createSelector } from 'reselect'

const getPredictions = (routines) => {
  return routines.nba.predictions
}

const getGameId = (routines) => routines.nba.summary.id

const makeFindGamePredictions = () => {
  return createSelector(
    [getPredictions, getGameId],
    (predictions, gameId) => (
      predictions.find(prediction => (
        prediction.match_id === gameId
      ))
    )
  )
}

export default makeFindGamePredictions
