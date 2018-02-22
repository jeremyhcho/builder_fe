import { createRoutine } from 'Routines'
import { push } from 'react-router-redux'

// Constants
import {
  FETCH_PICK_OF_THE_DAYS,
  FETCH_PICK_OF_THE_DAY,
  CREATE_PICK_OF_THE_DAY,
  DELETE_PICK_OF_THE_DAY,
  PUBLISH_PICK_OF_THE_DAY,
  UPDATE_PICK_OF_THE_DAY
} from 'Constants'

// Apis
import {
  apiFetchPickOfTheDays,
  apiFetchPickOfTheDay,
  apiCreatePickOfTheDay,
  apiDeletePickOfTheDay,
  apiUpdatePickOfTheDay
} from 'Apis'

// Actions
import { openSnackbar } from 'Actions'

export const fetchPickOfTheDays = createRoutine({
  prefix: FETCH_PICK_OF_THE_DAYS,
  api: apiFetchPickOfTheDays,
  reducerKey: ['admin', 'pickOfTheDays'],
  transform: 'replace'
})

export const fetchPickOfTheDay = createRoutine({
  prefix: FETCH_PICK_OF_THE_DAY,
  api: apiFetchPickOfTheDay,
  reducerKey: ['admin', 'pickOfTheDay'],
  transform: 'replace'
})

export const createPickOfTheDay = createRoutine({
  prefix: CREATE_PICK_OF_THE_DAY,
  api: apiCreatePickOfTheDay,
  reducerKey: ['admin', 'pickOfTheDays'],
  transform: 'concat',
  onSuccess: () => push({ pathname: '/admin/potd' })
})

export const deletePickOfTheDay = createRoutine({
  prefix: DELETE_PICK_OF_THE_DAY,
  api: apiDeletePickOfTheDay,
  reducerKey: ['admin', 'pickOfTheDays'],
  transform: 'removeById',
  onSuccess: () => openSnackbar('Pick of the Day Deleted', 3000)
})

export const publishPickOfTheDay = createRoutine({
  prefix: PUBLISH_PICK_OF_THE_DAY,
  api: apiUpdatePickOfTheDay,
  reducerKey: ['admin', 'pickOfTheDays'],
  transform: 'updateByIdAndChange',
  onSuccess: () => openSnackbar('Pick of the Day Published', 3000)
})

export const editPickOfTheDay = createRoutine({
  prefix: UPDATE_PICK_OF_THE_DAY,
  api: apiUpdatePickOfTheDay,
  reducerKey: ['admin', 'pickOfTheDays'],
  transform: 'updateByIdAndChange',
  onSuccess: () => openSnackbar('Pick of the Day Edited', 3000)
})
