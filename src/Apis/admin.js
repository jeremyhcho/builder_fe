import { axios } from 'Apis'

export const apiVerifyAdmin = () => (
  axios.get('/api/v1/users/verify_admin')
)
