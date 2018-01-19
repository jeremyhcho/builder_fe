import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import {
  getNBAMatchesModels,
  getNBAMatchesModelsPrediction,
  updateNBAMatchesModels
} from 'Apis'

// Constants
import {
  FETCH_NBA_MATCHES_MODELS,
  FETCH_NBA_MATCHES_MODELS_SUCCESS,
  FETCH_NBA_MATCHES_MODELS_FAIL,
  UPDATE_NBA_MATCHES_MODELS,
  UPDATE_NBA_MATCHES_MODELS_SUCCESS,
  UPDATE_NBA_MATCHES_MODELS_FAIL,
  FETCH_NBA_MATCHES_MODELS_PREDICTION,
  FETCH_NBA_MATCHES_MODELS_PREDICTION_SUCCESS,
  FETCH_NBA_MATCHES_MODELS_PREDICTION_FAIL
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

function* callFetchInitialPrediction ({ matchesModels }) {
  try {
    const selectedModel = matchesModels.data.find(model => model.status === 'ACTIVE') || matchesModels.data[0]
    const modelPrediction = yield call(getNBAMatchesModelsPrediction, selectedModel.id)
    yield put({ type: FETCH_NBA_MATCHES_MODELS_PREDICTION_SUCCESS, modelPrediction })
  } catch ({ response }) {
    yield put({ type: FETCH_NBA_MATCHES_MODELS_PREDICTION_FAIL })
    console.log('Failed to fetch initial match model predictions')
  }
}

function* callFetchMatchesModelsPrediction ({ matchModelId }) {
  try {
    const modelPrediction = yield call(getNBAMatchesModelsPrediction, matchModelId)
    yield put({ type: FETCH_NBA_MATCHES_MODELS_PREDICTION_SUCCESS, modelPrediction })
  } catch ({ response }) {
    yield put({ type: FETCH_NBA_MATCHES_MODELS_PREDICTION_FAIL })
    console.log('Failed to fetch match model predictions')
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

function* watchFetchMatchesModelsSuccess () {
  yield takeLatest(FETCH_NBA_MATCHES_MODELS_SUCCESS, callFetchInitialPrediction)
}

function* watchFetchMatchesModelsPrediction () {
  yield takeLatest(FETCH_NBA_MATCHES_MODELS_PREDICTION, callFetchMatchesModelsPrediction)
}

function* watchUpdateMatchesModels () {
  yield takeLatest(UPDATE_NBA_MATCHES_MODELS, callUpdateMatchesModels)
}

export default function* matchesModelsSaga () {
  yield all([
    watchFetchMatchesModels(),
    watchFetchMatchesModelsSuccess(),
    watchFetchMatchesModelsPrediction(),
    watchUpdateMatchesModels()
  ])
}
