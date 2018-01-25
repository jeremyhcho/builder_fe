import { createSelector } from 'reselect'

const getPredictions = (selectedModel) => (
  selectedModel.model.predictions
)

const getGameId = (summary) => summary.id

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
