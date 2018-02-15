import { createRoutine } from 'Routines'
import { push } from 'react-router-redux'

// Constants
import {
  VERIFY_ADMIN,
  CREATE_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENTS,
  DELETE_ANNOUNCEMENT,
  PUBLISH_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT
} from 'Constants'

// Apis
import {
  apiVerifyAdmin,
  apiCreateAnnouncement,
  apiFetchAnnouncements,
  apiDeleteAnnouncement,
  apiUpdateAnnouncement,
  apiFetchAnnouncement
} from 'Apis'

// Actions
import { openSnackbar } from 'Actions'

export const verifyAdmin = createRoutine({
  prefix: VERIFY_ADMIN,
  api: apiVerifyAdmin,
  reducerKey: ['admin', 'verifyAdmin'],
  transform: 'replace'
})

export const createAnnouncement = createRoutine({
  prefix: CREATE_ANNOUNCEMENT,
  api: apiCreateAnnouncement,
  reducerKey: ['admin', 'createAnnouncement'],
  transform: 'replace',
  onSuccess: () => push({ pathname: '/admin/announcements' })
})

export const fetchAnnouncements = createRoutine({
  prefix: FETCH_ANNOUNCEMENTS,
  api: apiFetchAnnouncements,
  reducerKey: ['admin', 'fetchAnnouncements'],
  transform: 'replace'
})

export const fetchAnnouncement = createRoutine({
  prefix: FETCH_ANNOUNCEMENT,
  api: apiFetchAnnouncement,
  reducerKey: ['admin', 'fetchAnnouncement'],
  transform: 'replace'
})

export const deleteAnnouncement = createRoutine({
  prefix: DELETE_ANNOUNCEMENT,
  api: apiDeleteAnnouncement,
  reducerKey: ['admin', 'fetchAnnouncements'],
  transform: 'removeById',
  onSuccess: () => openSnackbar('Announcement deleted', 3000)
})

export const publishAnnouncement = createRoutine({
  prefix: PUBLISH_ANNOUNCEMENT,
  api: apiUpdateAnnouncement,
  reducerKey: ['admin', 'fetchAnnouncements'],
  transform: 'updateByIdAndChange',
  onSuccess: () => openSnackbar('Announcement Published', 3000)
})

export const updateAnnouncement = createRoutine({
  prefix: UPDATE_ANNOUNCEMENT,
  api: apiUpdateAnnouncement,
  reducerKey: ['admin', 'updateAnnouncement'],
  transform: 'replace',
  onSuccess: () => push({ pathname: '/admin/announcements' })
})
