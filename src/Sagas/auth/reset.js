import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import {
  validateResetToken
} from 'Apis'

// Constants
import {
  VALIDATE_RESET_TOKEN,
  VALIDATE_RESET_TOKEN_SUCCESS,
  VALIDATE_RESET_TOKEN_FAIL
} from 'Constants'

// Helpers
import errorMessage from 'Helpers/errorMessage'

function* callValidateResetToken ({ params }) {
  try {
    yield call(validateResetToken, params)
    yield put({ type: VALIDATE_RESET_TOKEN_SUCCESS })
  } catch ({ response }) {
    yield put({ type: VALIDATE_RESET_TOKEN_FAIL, error: errorMessage(response) })
  }
}

function* watchValidateResetToken () {
  yield takeLatest(VALIDATE_RESET_TOKEN, callValidateResetToken)
}

export default function* sessionSaga () {
  yield all([
    watchValidateResetToken()
  ])
}
