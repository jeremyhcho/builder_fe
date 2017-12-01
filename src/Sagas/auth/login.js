import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import {
  login
} from 'Apis'

// Constants
import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS
} from 'Constants'

// Actions
import { authorize, unauthorize } from 'Actions'

// Helpers
import errorMessage from 'Helpers/errorMessage'

function* callLogin ({ params }) {
  try {
    yield call(login, params)
    yield put(authorize())
    yield put({ type: LOGIN_SUCCESS })
  } catch ({ response }) {
    yield put(unauthorize())
    yield put({ type: LOGIN_FAILED, error: errorMessage(response) })
  }
}

function* watchLogin () {
  yield takeLatest(LOGIN, callLogin)
}

export default function* sessionSaga () {
  yield [
    watchLogin()
  ]
}
