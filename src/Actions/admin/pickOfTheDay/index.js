import { createRoutine } from 'Routines'

// Constants
import {
  FETCH_PICK_OF_THE_DAYS
} from 'Constants'

// Apis
import {
  apiFetchPickOfTheDays
} from 'Apis'

export const fetchPickOfTheDays = createRoutine({
  prefix: FETCH_PICK_OF_THE_DAYS,
  api: apiFetchPickOfTheDays,
  reducerKey: ['admin', 'pickOfTheDays'],
  transform: 'replace'
})
