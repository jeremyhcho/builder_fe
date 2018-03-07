import { axios } from 'Apis'

export const apiFetchUsers = () => (
  axios.get('/api/v1/admin/users')
)
