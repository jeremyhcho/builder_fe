import { axios } from 'Apis'

export const apiFetchNotifications = () => (
  axios.get('/api/v1/notifications_users')
)

export const apiReadNotifications = () => (
  axios.put('/api/v1/notifications_users/mark_all')
)
