import { axios } from 'Apis'

export const postNBAModel = (model) => (
  axios.post('/api/nba/v1/models', model)
)

export const getNBAModels = () => (
  axios.get('/api/nba/v1/models')
)

export const deleteNBAModel = (id) => (
  axios.delete(`/api/nba/v1/models/${id}`)
)
