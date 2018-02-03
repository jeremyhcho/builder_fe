import { axios } from 'Apis'

export const getPredictions = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/predictions`)
)

export const getPrediction = (predictionId) => (
  axios.get(`/api/nba/v1/predictions/${predictionId}`)
)

export const putNBAMatchesModels = (modelId, params) => (
  axios.put(`/api/nba/v1/matches_models/${modelId}`, {
    matches_model: params
  })
)

export const getNBAAggregateTotals = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/predictions/aggregate_totals`)
)

export const getNBAAggregateSpreads = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/predictions/aggregate_spreads`)
)
