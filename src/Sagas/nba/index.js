import { put, takeLatest, all } from 'redux-saga/effects'

// Actions
import {
  fetchNBAPredictions,
  fetchNBAMatchup,
  openSnackbar
} from 'Actions'

import {
  FETCH_NBA_MATCHES_MODELS,
  FETCH_NBA_MATCHUP,
  FETCH_NBA_PREVIOUS_MEETINGS,
  DELETE_NBA_MODEL,
  CREATE_NBA_MODEL,
  UPDATE_NBA_MODEL
} from 'Constants'

function* callFetchInitialPredictions ({ response }) {
  try {
    const selectedModel = response.find(model => model.status === 'ACTIVE') || response[0]
    yield put(fetchNBAPredictions(selectedModel.id))
  } catch (error) {
    console.error('Failed to fetch nba initial predictions', error)
  }
}

function* callFetchMatchup ({ response }) {
  try {
    const initialMatchupId = response[0].id
    yield put(fetchNBAMatchup(initialMatchupId))
  } catch (error) {
    yield put({
      type: `${FETCH_NBA_MATCHUP}/FAIL`,
      key: {
        primaryKey: 'nba',
        type: 'matchup'
      },
      error
    })
    console.error('Failed to fetch nba matchup..no previous meetings found')
  }
}

function* callDeleteModelSnackbar () {
  yield put(openSnackbar('Model deleted', 3000))
}

function* callCreateModelSnackbar () {
  yield put(openSnackbar('Model created', 3000))
}

function* callUpdateModelSnackbar () {
  yield put(openSnackbar('Model updated', 3000))
}

function* watchFetchMatchModels () {
  yield takeLatest(`${FETCH_NBA_MATCHES_MODELS}/SUCCESS`, callFetchInitialPredictions)
}

function* watchFetchPreviousMeetings () {
  yield takeLatest(`${FETCH_NBA_PREVIOUS_MEETINGS}/SUCCESS`, callFetchMatchup)
}

function* watchDeleteModel () {
  yield takeLatest(`${DELETE_NBA_MODEL}/SUCCESS`, callDeleteModelSnackbar)
}

function* watchCreateModel () {
  yield takeLatest(`${CREATE_NBA_MODEL}/SUCCESS`, callCreateModelSnackbar)
}

function* watchUpdateModel () {
  yield takeLatest(`${UPDATE_NBA_MODEL}/SUCCESS`, callUpdateModelSnackbar)
}

export default function* nbaSaga () {
  yield all([
    watchFetchMatchModels(),
    watchFetchPreviousMeetings(),
    watchDeleteModel(),
    watchCreateModel(),
    watchUpdateModel()
  ])
}
