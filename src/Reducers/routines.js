const replace = (state, key, response) => ({
  ...state,
  [key]: response
})

const routines = (state = {}, action) => {
  const type = action.type.slice(action.type.lastIndexOf('/') + 1)
  switch (type) {
    case 'TRIGGER': {
      console.log('action was triggered')
      return {
        ...state
      }
    }

    case 'SUCCESS': {
      if (action.action === 'replace') {
        return replace(state, action.key, action.response)
      }

      return console.log('Api was successful but an action was not specified for the reducer')
    }

    case 'FAIL': {
      console.log('api call failed')
      return {
        ...state
      }
    }

    default:
      return state
  }
}

export default routines
