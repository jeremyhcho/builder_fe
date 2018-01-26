import { put, takeLatest, all } from 'redux-saga/effects'

// Actions
import {
  fetchNBAPredictions
} from 'Actions'

import {
  FETCH_NBA_MATCHES_MODELS
} from 'Constants'

function* fetchInitialPredictions ({ response }) {
  try {
    const selectedModel = response.find(model => model.status === 'ACTIVE') || response[0]
    yield put(fetchNBAPredictions(selectedModel.id))
  } catch (error) {
    console.error('Failed to fetch initial predictions', error)
  }
}

function* watchFetchMatchModels () {
  yield takeLatest(`${FETCH_NBA_MATCHES_MODELS}/SUCCESS`, fetchInitialPredictions)
}

export default function* nbaSaga () {
  yield all([
    watchFetchMatchModels()
  ])
}
