import createRoutine from 'Routines'

// Constants
import { FETCH_DASHBOARD_ANNOUNCEMENTS } from 'Constants'

// API
import { apiFetchPublishedAnnouncements } from 'Apis'

export const fetchDashboardAnnouncements = createRoutine({
  prefix: FETCH_DASHBOARD_ANNOUNCEMENTS,
  api: apiFetchPublishedAnnouncements,
  reducerKey: ['dashboard', 'fetchDashboardAnnouncements'],
  transform: 'replace'
})
