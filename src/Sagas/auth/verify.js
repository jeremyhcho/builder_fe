import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import {
  verifyUser,
  resendVerificationEmail
} from 'Apis'

// Constants
import {
  VERIFY_USER,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
  RESEND_VERIFICATION_EMAIL,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  RESEND_VERIFICATION_EMAIL_FAIL
} from 'Constants'

function* callVerifyUser ({ params }) {
  try {
    yield call(verifyUser, params)
    yield put({ type: VERIFY_USER_SUCCESS })
  } catch ({ response }) {
    yield put({ type: VERIFY_USER_FAIL })
  }
}

function* callResendVerificationEmail ({ userId }) {
  try {
    yield call(resendVerificationEmail, userId)
    yield put({ type: RESEND_VERIFICATION_EMAIL_SUCCESS })
  } catch ({ response }) {
    yield put({ type: RESEND_VERIFICATION_EMAIL_FAIL })
    console.log(response)
  }
}

function* watchVerifyUser () {
  yield takeLatest(VERIFY_USER, callVerifyUser)
}

function* watchResendVerificationEmail () {
  yield takeLatest(RESEND_VERIFICATION_EMAIL, callResendVerificationEmail)
}

export default function* sessionSaga () {
  yield all([
    watchVerifyUser(),
    watchResendVerificationEmail()
  ])
}
