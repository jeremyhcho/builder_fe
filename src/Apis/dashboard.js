import { axios } from 'Apis'

export const apiFetchPublishedAnnouncements = () => (
  axios.get('/api/v1/announcements', { params: { published: true } })
)

export const apiFetchRecentPredictions = () => (
  axios.get('/api/nba/v1/predictions/recent')
)
