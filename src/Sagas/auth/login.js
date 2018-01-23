import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import {
  login,
  logout
} from 'Apis'

// Constants
import {
  LOGIN,
  LOGIN_FAILED,
  LOGOUT
} from 'Constants'

// Actions
import { authorize, unauthorize } from 'Actions'

// Helpers
import errorMessage from 'Helpers/errorMessage'

function* callLogin ({ params }) {
  try {
    const { data } = yield call(login, params)
    yield put(authorize(data))
  } catch ({ response }) {
    yield put(unauthorize())
    yield put({ type: LOGIN_FAILED, error: errorMessage(response) })
  }
}

function* callLogout ({ params }) {
  try {
    yield call(logout, params)
    yield put(unauthorize())
  } catch ({ response }) {
    console.log('Failed to log out')
  }
}

function* watchLogin () {
  yield takeLatest(LOGIN, callLogin)
}

function* watchLogout () {
  yield takeLatest(LOGOUT, callLogout)
}

export default function* sessionSaga () {
  yield all([
    watchLogin(),
    watchLogout()
  ])
}
