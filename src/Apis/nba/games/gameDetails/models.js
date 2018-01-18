import { axios } from 'Apis'

export const getNBAMatchesModels = (matchId) => (
  axios.get(`/api/nba/v1/matches/${matchId}/matches_models`)
)

export const updateNBAMatchesModels = (modelId, params) => (
  axios.put(`/api/nba/v1/matches_models/${modelId}`, {
    matches_model: params
  })
)
