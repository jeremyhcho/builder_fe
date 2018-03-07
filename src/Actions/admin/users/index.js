import { createRoutine } from 'Routines'

// Constants
import { FETCH_USERS } from 'Constants'

// Apis
import { apiFetchUsers } from 'Apis'

export const fetchAdminUsers = createRoutine({
  prefix: FETCH_USERS,
  api: apiFetchUsers,
  reducerKey: ['admin', 'users'],
  transform: 'replace'
})
