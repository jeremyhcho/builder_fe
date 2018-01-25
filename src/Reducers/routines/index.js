import * as transform from './stateTransformers'

const initialState = {
  nba: {},
  callingApi: {},
  error: {}
}

const routines = (state = initialState, action) => {
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
      if (action.transform === 'replace') {
        return transform.replace(state, action.key, action.response, action.loaderKey)
      }

      if (action.transform === 'concat') {
        return transform.concat(state, action.key, action.response, action.loaderKey)
      }

      if (action.transform === 'removeById') {
        return transform.removeById(state, action.key, action.response, action.loaderKey)
      }

      if (action.transform === 'updateById') {
        return transform.updateById(state, action.key, action.response, action.loaderKey)
      }

      if (typeof action.transform === 'function') {
        return transform.customTransform(state,
          action.key, action.transform(action.response), action.loaderKey)
      }

      return console.log('Api was successful but an action was not specified for the reducer')
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
