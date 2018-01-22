import { axios } from 'Apis'

export const getNBAMatchesModels = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/matches_models`)
)

export const getNBAMatchesModelsPrediction = (matchModelId) => (
  axios.get(`/api/nba/v1/matches_models/${matchModelId}`)
)

export const updateNBAMatchesModels = (modelId, params) => (
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
