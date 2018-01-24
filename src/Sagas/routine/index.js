import { put, call, takeLatest, all } from 'redux-saga/effects'

// Constants
import { ROUTINE_INIT } from 'Constants'

function* initializeRoutine ({ actionTypes, api, routineOpts, ...payload }) {
  if (!actionTypes.prefix) throw new Error('Invalid prefix')
  if (!routineOpts) throw new Error('Invalid routine')

  try {
    yield put({ type: actionTypes.TRIGGER })
    const response = yield call(api, ...payload)
    yield put({
      type: actionTypes.SUCCESS,
      key: routineOpts.reducerKey,
      action: routineOpts.action,
      response: response.data
    })
  } catch (error) {
    yield put({ type: actionTypes.FAIL, error })
    console.log(error)
  }
}
function* watchRoutineInit () {
  yield takeLatest(ROUTINE_INIT, initializeRoutine)
}

export default function* routineSaga () {
  yield all([
    watchRoutineInit()
  ])
}
