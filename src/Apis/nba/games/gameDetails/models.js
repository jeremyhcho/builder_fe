import { axios } from 'Apis'

export const getPredictions = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/predictions`)
)

export const getPrediction = (predictionId) => (
  axios.get(`/api/nba/v1/predictions/${predictionId}`)
)

export const putNBAPrediction = (predictionId, params) => (
  axios.put(`/api/nba/v1/predictions/${predictionId}`, {
    prediction: params
  })
)

export const getNBAAggregateTotals = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/predictions/aggregate_totals`)
)

export const getNBAAggregateSpreads = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/predictions/aggregate_spreads`)
)
