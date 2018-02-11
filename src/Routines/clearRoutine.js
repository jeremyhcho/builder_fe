import { CLEAR_ROUTINE } from 'Constants'

const clearRoutine = (reducerKey) => ({
  type: CLEAR_ROUTINE,
  key: reducerKey
})

export default clearRoutine
