import { createRoutine } from 'Routines'

// Constants
import {
  FETCH_DASHBOARD_ANNOUNCEMENTS,
  FETCH_RECENT_PREDICTIONS,
  FETCH_DASHBOARD_POTD
} from 'Constants'

// API
import {
  apiFetchPublishedAnnouncements,
  apiFetchRecentPredictions,
  apiFetchDashboardPotd
} from 'Apis'

export const fetchDashboardAnnouncements = createRoutine({
  prefix: FETCH_DASHBOARD_ANNOUNCEMENTS,
  api: apiFetchPublishedAnnouncements,
  reducerKey: ['dashboard', 'fetchDashboardAnnouncements'],
  transform: 'replace'
})

export const fetchRecentPredictions = createRoutine({
  prefix: FETCH_RECENT_PREDICTIONS,
  api: apiFetchRecentPredictions,
  reducerKey: ['dashboard', 'fetchRecentPredictions'],
  transform: 'replace'
})

export const fetchDashboardPotd = createRoutine({
  prefix: FETCH_DASHBOARD_POTD,
  api: apiFetchDashboardPotd,
  reducerKey: ['dashboard', 'potd'],
  transform: 'replace'
})
