import { put, call, takeLatest, all } from 'redux-saga/effects'
import { push } from 'react-router-redux'

// Apis
import {
  createUser,
  updateUser,
  sendRecoveryEmail,
  fetchUser
} from 'Apis'

// Constants
import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
  SEND_RECOVERY_EMAIL,
  SEND_RECOVERY_EMAIL_FAIL,
  SEND_RECOVERY_EMAIL_SUCCESS,
  FETCH_USER
} from 'Constants'

// Actions
import {
  authorize,
  unauthorize
} from 'Actions'

// Helpers
import errorMessage from 'Helpers/errorMessage'

function* callCreateUser (user) {
  try {
    const response = yield call(createUser, user)
    yield put({ type: CREATE_USER_SUCCESS, user: response.data })
  } catch ({ response }) {
    yield put(unauthorize())
    yield put({ type: CREATE_USER_FAIL, error: errorMessage(response) })
  }
}

function* callUpdateUserPassword ({ userId, params }) {
  try {
    yield call(updateUser, userId, params)
    yield put(push({ pathname: '/auth/login', state: { resetPassword: true } }))
    yield put({ type: UPDATE_USER_PASSWORD_SUCCESS })
  } catch ({ response }) {
    yield put({ type: UPDATE_USER_PASSWORD_FAIL, error: errorMessage(response) })
  }
}

function* callSendRecoveryEmail ({ email }) {
  try {
    yield call(sendRecoveryEmail, email)
    yield put({ type: SEND_RECOVERY_EMAIL_SUCCESS })
  } catch ({ response }) {
    yield put({ type: SEND_RECOVERY_EMAIL_FAIL, error: errorMessage(response) })
  }
}

function* callFetchUser () {
  try {
    const { data } = yield call(fetchUser)
    const { user } = yield put(authorize(data))
    window.Appcues.identify(user.id, {
      email: user.email,
      trial: user.trial
    })
  } catch ({ response }) {
    yield put(unauthorize())
  }
}


function* watchCreateUser () {
  yield takeLatest(CREATE_USER, callCreateUser)
}

function* watchUpdateUserPassword () {
  yield takeLatest(UPDATE_USER_PASSWORD, callUpdateUserPassword)
}

function* watchSendRecoveryEmail () {
  yield takeLatest(SEND_RECOVERY_EMAIL, callSendRecoveryEmail)
}

function* watchFetchUser () {
  yield takeLatest(FETCH_USER, callFetchUser)
}

export default function* userSaga () {
  yield all([
    watchCreateUser(),
    watchUpdateUserPassword(),
    watchSendRecoveryEmail(),
    watchFetchUser()
  ])
}
