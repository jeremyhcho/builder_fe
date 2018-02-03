import createRoutine from 'Routines'

// Constants
import {
  VERIFY_ADMIN
} from 'Constants'

// Apis
import { apiVerifyAdmin } from 'Apis'

export const verifyAdmin = createRoutine({
  prefix: VERIFY_ADMIN,
  api: apiVerifyAdmin,
  reducerKey: { primaryKey: 'admin', type: 'verifyAdmin' },
  transform: 'replace'
})
