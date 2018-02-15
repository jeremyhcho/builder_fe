import { axios } from 'Apis'

export const apiVerifyAdmin = () => (
  axios.get('/api/v1/users/verify_admin')
)

export const apiCreateAnnouncement = (announcement) => (
  axios.post('/api/v1/announcements', { announcement })
)

export const apiFetchAnnouncements = () => (
  axios.get('/api/v1/announcements')
)

export const apiDeleteAnnouncement = (id) => (
  axios.delete(`/api/v1/announcements/${id}`)
)

export const apiUpdateAnnouncement = (id, announcement) => (
  axios.put(`/api/v1/announcements/${id}`, { announcement })
)

export const apiFetchAnnouncement = (id) => (
  axios.get(`/api/v1/announcements/${id}`)
)
