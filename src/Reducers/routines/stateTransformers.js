const mutate = (response, transformAction, stateKey) => {
  switch (transformAction) {
    case 'replace':
      return response

    case 'concat':
      return [...stateKey, response]

    case 'remove':
      return null

    case 'removeById':
      return stateKey.filter(data => data.id !== response.id)

    case 'updateByIdAndReplace':
      return stateKey.map(data => {
        if (data.id !== response.id) return data
        return response
      })

    case 'updateByIdAndChange':
      return stateKey.map(data => {
        if (data.id !== response.id) return data
        return { ...data, ...response }
      })

    default: {
      const customTransform = transformAction(response)
      return { ...stateKey, customTransform }
    }
  }
}

const transform = (state, reducerKey, loaderKey, transformAction, response) => {
  const oldState = {
    ...state
  }
  console.log(state)
  console.log('oldState WTF: ', oldState)
  let newState
  reducerKey.forEach((key, index, keyList) => {
    const previousKey = keyList[index - 1]
    if (!previousKey) {
      newState = oldState
      console.log('FIRST KEY IN REDUCERKEY', newState)
    } else {
      console.log('The previous key: ', previousKey)
      newState = newState[previousKey]
      console.log('NOT FIRST KEY', newState)
    }

    if (index === keyList.length - 1) {
      Object.assign(newState, {
        ...newState,
        [key]: mutate(response, transformAction, newState)
      })
      console.log('MUTATING ON LAST KEY', newState)
    } else {
      Object.assign(newState, {
        ...newState,
        [key]: {}
      })
      console.log('TRAVELING THRU STATE', newState)
    }
    console.log('current new State: ', newState)
  })

  return {
    ...newState,
    callingApi: {
      ...state.callingApi,
      [loaderKey]: false
    }
  }
}

export default transform
