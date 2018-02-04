// import * as transform from './stateTransformers'
import transform from './stateTransformers'
import pathToRegexp from 'path-to-regexp'
import gameDetails from './gameDetails'

const initialState = {
  auth: {},
  nba: {},
  callingApi: {},
  error: {},
  admin: {}
}

const routines = (state = initialState, action) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const route = '/games/:id/:section'

    if (pathToRegexp(route).exec(action.payload.pathname)) {
      return state
    }

    const newState = {}
    const gameDetailKeys = Object.keys(gameDetails)
    Object.keys(state.nba).filter(key => !gameDetailKeys.includes(key))
      .forEach(key => Object.assign(newState, {
        [key]: state.nba[key]
      }))

    return {
      ...state,
      nba: {
        ...newState
      }
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
        },
        error: {
          ...state.error,
          [action.loaderKey]: false
        }
      }
    }

    case 'SUCCESS':
      return transform(state, action.key, action.loaderKey, action.transform, action.response)

    case 'FAIL': {
      return {
        ...state,
        callingApi: {
          ...state.callingApi,
          [action.loaderKey]: false
        },
        error: {
          ...state.error,
          [action.loaderKey]: true
        }
      }
    }

    default:
      return state
  }
}

export default routines
