import { createSelector } from 'reselect'

// const getPredictions = (routines) => {
//   return routines.nba.predictions
// }
//
// const getGameId = (routines) => routines.nba.summary.id
//
// const makeFindGamePredictions = () => {
//   return createSelector(
//     [getPredictions, getGameId],
//     (predictions, gameId) => (
//       predictions.find(prediction => (
//         prediction.match_id === gameId
//       ))
//     )
//   )
// }
//
// export default makeFindGamePredictions

const getModel = (routines) => routines.nba.model

const makeGetModelPredictions = () => {
  return createSelector(
    getModel,
    (model) => {
      if (!model) return null
      return model.predictions
    }
  )
}

export default makeGetModelPredictions
