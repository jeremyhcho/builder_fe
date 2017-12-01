import { axios } from 'Apis'

export const login = (params) => (
  axios.post('/api/v1/login', params)
)

export const logout = (params) => (
  axios.delete('/api/v1/logout', params)
)
