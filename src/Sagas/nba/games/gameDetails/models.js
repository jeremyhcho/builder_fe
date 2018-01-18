import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import {
  getNBAMatchesModels,
  updateNBAMatchesModels
} from 'Apis'

// Constants
import {
  FETCH_NBA_MATCHES_MODELS,
  FETCH_NBA_MATCHES_MODELS_SUCCESS,
  FETCH_NBA_MATCHES_MODELS_FAIL,
  UPDATE_NBA_MATCHES_MODELS,
  UPDATE_NBA_MATCHES_MODELS_SUCCESS,
  UPDATE_NBA_MATCHES_MODELS_FAIL
} from 'Constants'

function* callFetchMatchesModels ({ matchId }) {
  try {
    const matchesModels = yield call(getNBAMatchesModels, matchId)
    yield put({ type: FETCH_NBA_MATCHES_MODELS_SUCCESS, matchesModels })
  } catch ({ response }) {
    yield put({ type: FETCH_NBA_MATCHES_MODELS_FAIL })
    console.log('Failed to fetch match models')
  }
}

function* callUpdateMatchesModels ({ modelId, newStatus }) {
  try {
    const matchesModels = yield call(updateNBAMatchesModels, modelId, newStatus)
    yield put({ type: UPDATE_NBA_MATCHES_MODELS_SUCCESS, matchesModels })
  } catch ({ response }) {
    yield put({ type: UPDATE_NBA_MATCHES_MODELS_FAIL })
    console.log('Failed to update match models')
  }
}

function* watchFetchMatchesModels () {
  yield takeLatest(FETCH_NBA_MATCHES_MODELS, callFetchMatchesModels)
}

function* watchUpdateMatchesModels () {
  yield takeLatest(UPDATE_NBA_MATCHES_MODELS, callUpdateMatchesModels)
}

export default function* matchesModelsSaga () {
  yield all([
    watchFetchMatchesModels(),
    watchUpdateMatchesModels()
  ])
}
