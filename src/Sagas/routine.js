import { put, call, takeEvery, all } from 'redux-saga/effects'

// Constants
import { ROUTINE_INIT } from 'Constants'

function* initializeRoutine ({ actionTypes, api, routineOpts, payload }) {
  if (!actionTypes.TRIGGER) throw new Error('Invalid prefix')
  if (!routineOpts) throw new Error('Invalid routine')
  const loaderKey = `${api}`.slice(9, `${api}`.indexOf('('))

  try {
    yield put({
      type: actionTypes.TRIGGER,
      key: routineOpts.reducerKey,
      payload
    })

    yield put({
      type: actionTypes.REQUEST,
      key: routineOpts.reducerKey,
      loaderKey,
      payload
    })

    const response = yield call(api, ...payload)

    yield put({
      type: actionTypes.SUCCESS,
      key: routineOpts.reducerKey,
      loaderKey,
      transform: routineOpts.transform,
      response: response.data,
      payload
    })
  } catch (error) {
    yield put({
      type: actionTypes.FAIL,
      key: routineOpts.reducerKey,
      loaderKey,
      error
    })
    console.log(error)
  }
}
function* watchRoutineInit () {
  yield takeEvery(ROUTINE_INIT, initializeRoutine)
}

export default function* routineSaga () {
  yield all([
    watchRoutineInit()
  ])
}
