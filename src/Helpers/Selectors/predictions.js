import { createSelector } from 'reselect'

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
