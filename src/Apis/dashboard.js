import { axios } from 'Apis'

export const apiFetchPublishedAnnouncements = () => (
  axios.get('/api/v1/announcements', { params: { published: true } })
)

export const apiFetchRecentPredictions = () => (
  axios.get('/api/nba/v1/predictions/recent')
)

export const apiFetchDashboardPotd = () => (
  axios.get('/api/v1/pick_of_the_days', { params: { dashboard: true } })
)
