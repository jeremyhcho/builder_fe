// Constants
import { ROUTINE_INIT } from 'Constants'

const createRoutine = (prefix, api, routineOpts) => {
  const actionTypes = {
    prefix,
    TRIGGER: `${prefix}/TRIGGER`,
    SUCCESS: `${prefix}/SUCCESS`,
    FAIL: `${prefix}/FAIL`
  }

  return (payload) => {
    console.log('Creating routine with payload.. ', payload)
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
ie. const fetchTodos = createRoutine('FETCH_TODOS')
ie. const fetchTodos = createRoutine('FETCH_TODOS', axios.get('/api/fetch_todos'))
ie. const fetchTodos = createRoutine('FETCH_TODOS', axios.get('/api/fetch_todos'), {
  reducerKey: 'todos',
  action: 'replace' ~ ['replace', 'concat', ..etc.]
})

routineOpts keys: {
  reducerKey: String.isRequired ~ state to store in reducer,
  action: String.isRequired ~ action to perform on a successful response
}
*/
