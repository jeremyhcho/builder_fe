import { createRoutine } from 'Routines'

// Actions
import { openSnackbar } from 'Actions'

// Apis
import {
  getNBAModels,
  postNBAModel,
  deleteNBAModel,
  putNBAModel,
  getNBAModel
} from 'Apis'

// Constants
import {
  CREATE_NBA_MODEL,
  FETCH_NBA_MODELS,
  DELETE_NBA_MODEL,
  UPDATE_NBA_MODEL,
  FETCH_NBA_MODEL
} from 'Constants'

export const fetchNBAModels = createRoutine({
  prefix: FETCH_NBA_MODELS,
  api: getNBAModels,
  reducerKey: ['nba', 'models'],
  transform: 'replace'
})

export const fetchNBAModel = createRoutine({
  prefix: FETCH_NBA_MODEL,
  api: getNBAModel,
  reducerKey: ['nba', 'model'],
  transform: 'replace'
})

export const createNBAModel = createRoutine({
  prefix: CREATE_NBA_MODEL,
  api: postNBAModel,
  reducerKey: ['nba', 'models'],
  transform: 'concat',
  onSuccess: () => openSnackbar('Model created', 3000)
})

export const removeNBAModel = createRoutine({
  prefix: DELETE_NBA_MODEL,
  api: deleteNBAModel,
  reducerKey: ['nba', 'models'],
  transform: 'removeById',
  onSuccess: () => openSnackbar('Model deleted', 3000)
})

export const updateNBAModel = createRoutine({
  prefix: UPDATE_NBA_MODEL,
  api: putNBAModel,
  reducerKey: ['nba', 'models'],
  transform: 'updateByIdAndReplace',
  onSuccess: () => openSnackbar('Model updated', 3000)
})
