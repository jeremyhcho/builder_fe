// Constants
import { CLEAR_ROUTINE } from 'Constants'

import transform from './stateTransformers'
import pathToRegexp from 'path-to-regexp'
import gameDetails from './gameDetails'
import teamDetails from './teamDetails'

const initialState = {
  auth: {},
  nba: {},
  isLoading: {},
  error: {},
  admin: {},
  dashboard: {}
}

const filterKeys = (sections, pathname) => {
  let filterKeys = []

  sections.forEach(section => {
    if (!pathToRegexp(section.route).exec(pathname)) {
      filterKeys = filterKeys.concat(section.keys)
    }
  })

  return filterKeys
}

const routines = (state = initialState, action) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const gameDetailsRoute = '/games/:id/:section'
    const teamDetailsRoute = '/teams/:id/:section'

    const filteredKeys = filterKeys(
      [
        { route: gameDetailsRoute, keys: gameDetails },
        { route: teamDetailsRoute, keys: teamDetails }
      ],
      action.payload.pathname
    )

    const newState = {}
    Object.keys(state.nba).filter(key => !filteredKeys.includes(key))
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

  if (action.type === CLEAR_ROUTINE) {
    return transform(state, action.key, 'clear')
  }

  const type = action.type.slice(action.type.lastIndexOf('/') + 1)
  switch (type) {
    case 'REQUEST': {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.loaderKey]: true
        },
        error: {
          ...state.error,
          [action.loaderKey]: false
        }
      }
    }

    case 'SUCCESS':
      return transform(state, action.key, action.transform, action.loaderKey, action.response)

    case 'FAIL': {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
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
