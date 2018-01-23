import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import {
  getNBAPredictability
} from 'Apis'

// Constants
import {
  FETCH_NBA_PREDICTABILITY,
  FETCH_NBA_PREDICTABILITY_SUCCESS,
  FETCH_NBA_PREDICTABILITY_FAIL
} from 'Constants'

function* callFetchPredictability ({ matchId }) {
  try {
    const predictability = yield call(getNBAPredictability, matchId)
    console.log('predictability fetch success: ', predictability)
    yield put({ type: FETCH_NBA_PREDICTABILITY_SUCCESS, predictability })
  } catch ({ response }) {
    yield put({ type: FETCH_NBA_PREDICTABILITY_FAIL })
    console.log('Failed to fetch predictability trends')
  }
}

function* watchFetchPredictability () {
  yield takeLatest(FETCH_NBA_PREDICTABILITY, callFetchPredictability)
}

export default function* trendsSaga () {
  yield all([
    watchFetchPredictability()
  ])
}
