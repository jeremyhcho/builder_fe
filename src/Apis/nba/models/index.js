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

export const putNBAModel = (id, model) => (
  axios.put(`/api/nba/v1/models/${id}`, model)
)

export const getNBAModel = (id) => (
  axios.get(`/api/nba/v1/models/${id}`)
)
