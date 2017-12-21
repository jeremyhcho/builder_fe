import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import {
  getSummaryData
} from 'Apis'

// Constants
import {
  FETCH_NBA_SUMMARY,
} from 'Constants'

// Actions
import { receiveNBASummary } from 'Actions'

function* getSummary ({ id }) {
  try {
    const summary = yield call(getSummaryData, id)
    yield put(receiveNBASummary(summary))
  } catch ({ response }) {
    console.log('no summaries found: ', response)
  }
}

function* watchNBASummaryFetch () {
  yield takeLatest(FETCH_NBA_SUMMARY, getSummary)
}

export default function* overviewSaga () {
  yield [
    watchNBASummaryFetch()
  ]
}
