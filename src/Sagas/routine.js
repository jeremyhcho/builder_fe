import { put, call, takeEvery, all } from 'redux-saga/effects'

// Constants
import { ROUTINE_INIT } from 'Constants'

function* initializeRoutine ({
  actionTypes,
  api,
  reducerKey,
  transform,
  onSuccess,
  onFail,
  payload
}) {
  const loaderKey = actionTypes.TRIGGER.slice(
    actionTypes.TRIGGER.lastIndexOf('/') + 1
  )

  try {
    yield put({
      type: actionTypes.TRIGGER,
      key: reducerKey,
      payload
    })

    yield put({
      type: actionTypes.REQUEST,
      key: reducerKey,
      loaderKey,
      payload
    })

    const response = yield call(api, ...payload)

    yield put({
      type: actionTypes.SUCCESS,
      key: reducerKey,
      loaderKey,
      transform,
      response: response.data,
      payload
    })

    if (onSuccess) {
      yield put(onSuccess(...payload))
    }
  } catch ({ response }) {
    yield put({
      type: actionTypes.FAIL,
      key: reducerKey,
      loaderKey,
      error: typeof response.data === 'string' && response.data.includes('!DOCTYPE html') ? false : response.data
    })

    if (onFail) {
      yield put(onFail())
    }
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
