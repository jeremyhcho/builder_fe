export const replace = (state, key, response, loaderKey) => ({
  ...state,
  [key.primaryKey]: {
    ...state[key.primaryKey],
    [key.type]: response
  },
  callingApi: {
    ...state.callingApi,
    [loaderKey]: false
  }
})

export const concat = (state, key, response, loaderKey) => ({
  ...state,
  [key.primaryKey]: {
    ...state[key.primaryKey],
    [key.type]: [...state[key.primaryKey][key.type], response]
  },
  callingApi: {
    ...state.callingApi,
    [loaderKey]: false
  }
})

export const remove = (state, key, response, loaderKey) => ({
  ...state,
  [key.primaryKey]: {
    ...state[key.primaryKey],
    [key.type]: null
  },
  callingApi: {
    ...state.callingApi,
    [loaderKey]: false
  }
})

export const removeById = (state, key, response, loaderKey) => ({
  ...state,
  [key.primaryKey]: {
    ...state[key.primaryKey],
    [key.type]: state[key.primaryKey][key.type].filter(data => data.id !== response.id)
  },
  callingApi: {
    ...state.callingApi,
    [loaderKey]: false
  }
})

export const updateByIdAndReplace = (state, key, response, loaderKey) => ({
  ...state,
  [key.primaryKey]: {
    ...state[key.primaryKey],
    [key.type]: state[key.primaryKey][key.type].map(data => {
      if (data.id !== response.id) return data
      return response
    })
  },
  callingApi: {
    ...state.callingApi,
    [loaderKey]: false
  }
})

export const updateByIdAndChange = (state, key, response, loaderKey) => ({
  ...state,
  [key.primaryKey]: {
    ...state[key.primaryKey],
    [key.type]: state[key.primaryKey][key.type].map(data => {
      if (data.id !== response.id) return data
      return { ...data, ...response }
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
    [key.primaryKey]: { ...state[key.primaryKey], [key.type]: response },
    callingApi: {
      ...state.callingApi,
      [loaderKey]: false
    }
  })
}
