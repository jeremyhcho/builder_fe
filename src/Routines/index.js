// Constants
import { ROUTINE_INIT } from 'Constants'

const typeErrorMessage = (input, inputType, expectedType) => {
  return `Invalid type of ${typeof input} supplied to ${input}, expected ${expectedType}`
}

const routineErrors = (prefix, api, reducerKey, transform) => {
  if (typeof prefix !== 'string') throw new TypeError(typeErrorMessage('prefix', prefix, 'string'))
  if (typeof api !== 'function') throw new TypeError(typeErrorMessage('api', api, 'function'))
  if (typeof reducerKey !== 'object') throw new TypeError(typeErrorMessage('reducerKey', reducerKey, 'object'))
  if (!['string', 'function'].includes(typeof transform)) {
    throw new TypeError(typeErrorMessage('transform', transform, 'string or function'))
  }
}

const createRoutine = ({ prefix, api, reducerKey, transform }) => {
  routineErrors(prefix, api, reducerKey, transform)

  const actionTypes = {
    TRIGGER: prefix,
    REQUEST: `${prefix}/REQUEST`,
    SUCCESS: `${prefix}/SUCCESS`,
    FAIL: `${prefix}/FAIL`
  }

  return (...payload) => {
    return ({
      type: ROUTINE_INIT,
      actionTypes,
      api,
      reducerKey,
      transform,
      payload
    })
  }
}

export default createRoutine


/*
**Dev-notes**
ie. const fetchTodos = createRoutine('FETCH_TODOS', axios.get('/api/fetch_todos'), {
  reducerKey: 'todos',
  transform: 'replace' ~ ['replace', 'concat', ..etc.]
})

routineOpts keys: {
  reducerKey: String.isRequired ~ state to store in reducer,
  transform: String | Func.isRequired ~ action to perform on a successful response,
}
*/
