// Constants
import { ROUTINE_INIT } from 'Constants'

const createRoutine = (prefix, api, routineOpts) => {
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
      routineOpts,
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
