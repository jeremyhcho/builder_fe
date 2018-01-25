export const replace = (state, key, response, loaderKey) => ({
  ...state,
  [key.sport]: {
    ...state[key.sport],
    [key.type]: response
  },
  callingApi: {
    ...state.callingApi,
    [loaderKey]: false
  }
})

export const concat = (state, key, response, loaderKey) => ({
  ...state,
  [key.sport]: {
    ...state[key.sport],
    [key.type]: [...state[key.sport][key.type], response]
  },
  callingApi: {
    ...state.callingApi,
    [loaderKey]: false
  }
})

export const removeById = (state, key, response, loaderKey) => ({
  ...state,
  [key.sport]: {
    ...state[key.sport],
    [key.type]: state[key.sport][key.type].filter(data => data.id !== response.id)
  },
  callingApi: {
    ...state.callingApi,
    [loaderKey]: false
  }
})

export const updateById = (state, key, response, loaderKey) => ({
  ...state,
  [key.sport]: {
    ...state[key.sport],
    [key.type]: state[key.sport][key.type].map(data => {
      if (data.id !== response.id) return data
      return response
    })
  },
  callingApi: {
    ...state.callingApi,
    [loaderKey]: false
  }
})

export const customTransform = (state, key, response, loaderKey) => {
  return ({
    ...state,
    [key.sport]: { ...state[key.sport], [key.type]: response },
    callingApi: {
      ...state.callingApi,
      [loaderKey]: false
    }
  })
}
