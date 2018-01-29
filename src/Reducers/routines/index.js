import * as transform from './stateTransformers'
import pathToRegexp from 'path-to-regexp'

import {
  CLEAR_NBA_SUMMARY
} from 'Constants'

const initialState = {
  nba: {},
  callingApi: {},
  error: {}
}

const routines = (state = initialState, action) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const route = '/games/:id/:section'

    if (pathToRegexp(route).exec(action.payload.pathname)) {
      return state
    }

    return {
      ...state,
      nba: {
        models: state.nba.models,
        teams: state.nba.teams,
        games: state.nba.games
      }
    }
  }

  if (action.type === CLEAR_NBA_SUMMARY) {
    return {
      ...state,
      nba: { ...state.nba, summary: {} }
    }
  }

  const type = action.type.slice(action.type.lastIndexOf('/') + 1)
  switch (type) {
    case 'REQUEST': {
      return {
        ...state,
        callingApi: {
          ...state.callingApi,
          [action.loaderKey]: true
        }
      }
    }

    case 'SUCCESS': {
      if (typeof action.transform === 'function') {
        return transform.customTransform(
          state, action.key, action.transform(action.response), action.loaderKey)
      }

      try {
        return transform[action.transform](state, action.key, action.response, action.loaderKey)
      } catch ({ response }) {
        console.error(`${action.transform} does not have valid transform action`, response)
        return { ...state }
      }
    }

    case 'FAIL': {
      return {
        ...state,
        callingApi: {
          ...state.callingApi,
          [action.loaderKey]: false
        }
      }
    }

    default:
      return state
  }
}

export default routines
