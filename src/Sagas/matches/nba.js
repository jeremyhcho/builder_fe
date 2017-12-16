import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import {
  getNBAData
} from 'Apis'

// Constants
import {
  FETCH_NBA_MATCHES
} from 'Constants'

// Actions
import { receiveNBAMatches } from 'Actions'

function* getMatches (params) {
  try {
    const from = params.from.toDate().toISOString()
    const to = params.to.toDate().toISOString()
    const data = yield call(getNBAData, { from, to })
    yield put(receiveNBAMatches(data))
  } catch ({ response }) {
    // HANDLE ERROR HANDLE ERROR HANDLE ERROR HANDLE ERROR @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    console.log('no matches found: ', response)
  }
}

function* watchNBA () {
  yield takeLatest(FETCH_NBA_MATCHES, getMatches)
}

export default function* nbaSaga () {
  yield [
    watchNBA()
  ]
}
