import createRoutine from 'Routines'

// Apis
import {
  getNBAModels,
  postNBAModel,
  deleteNBAModel,
  putNBAModel
} from 'Apis'

// Constants
import {
  CREATE_NBA_MODEL,
  FETCH_NBA_MODELS,
  DELETE_NBA_MODEL,
  UPDATE_NBA_MODEL
} from 'Constants'

export const fetchNBAModels = createRoutine(
  FETCH_NBA_MODELS,
  getNBAModels,
  {
    reducerKey: {
      sport: 'nba',
      type: 'models'
    },
    transform: 'replace'
  }
)

export const createNBAModel = createRoutine(
  CREATE_NBA_MODEL,
  postNBAModel,
  {
    reducerKey: {
      sport: 'nba',
      type: 'models'
    },
    transform: 'concat'
  }
)

export const removeNBAModel = createRoutine(
  DELETE_NBA_MODEL,
  deleteNBAModel,
  {
    reducerKey: {
      sport: 'nba',
      type: 'models'
    },
    transform: 'removeById'
  }
)

export const updateNBAModel = createRoutine(
  UPDATE_NBA_MODEL,
  putNBAModel,
  {
    reducerKey: {
      sport: 'nba',
      type: 'models'
    },
    transform: 'updateById'
  }
)
