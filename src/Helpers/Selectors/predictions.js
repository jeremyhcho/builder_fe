import { createSelector } from 'reselect'
import moment from 'moment'

const getModel = (routines) => routines.nba.model

const makeGetModelPredictions = () => {
  return createSelector(
    getModel,
    (model) => {
      if (!model) return null
      return model.predictions.sort(
        (a, b) => moment(new Date(a.match.date)).diff(moment(new Date(b.match.date))))
    }
  )
}

export default makeGetModelPredictions
