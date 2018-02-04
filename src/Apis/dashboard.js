import { axios } from 'Apis'

export const apiFetchPublishedAnnouncements = () => (
  axios.get('/api/v1/announcements', { params: { published: true } })
)
