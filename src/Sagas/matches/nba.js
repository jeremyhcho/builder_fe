import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import {
  getNBAData
} from 'Apis'

// Constants
import {
  FETCH_NBA_MATCHES,
  PAGINATE_NBA_MATCHES
} from 'Constants'

// Actions
import { receiveNBAMatches, receiveNBAPaginatedMatches } from 'Actions'

function* getMatches (params) {
  try {
    const from = params.from.toDate().toISOString()
    const to = params.to.toDate().toISOString()
    const nbaMatches = yield call(getNBAData, { from, to })
    yield put(receiveNBAMatches(nbaMatches))
  } catch ({ response }) {
    // HANDLE ERROR HANDLE ERROR HANDLE ERROR HANDLE ERROR @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    console.log('no matches found: ', response)
  }
}

function* paginateMatches ({ from, to, paginateType }) {
  try {
    const fromString = from.toDate().toISOString()
    const toString = to.toDate().toISOString()
    const { data } = yield call(getNBAData, { from: fromString, to: toString })
    yield put(receiveNBAPaginatedMatches(data, paginateType))
  } catch ({ response }) {
    // HANDLE ERROR HANDLE ERROR HANDLE ERROR HANDLE ERROR @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    console.log('no matches found: ', response)
  }
}

function* watchNBAMatchesFetch () {
  yield takeLatest(FETCH_NBA_MATCHES, getMatches)
}

function* watchNBAMatchesPagination () {
  yield takeLatest(PAGINATE_NBA_MATCHES, paginateMatches)
}

export default function* nbaSaga () {
  yield [
    watchNBAMatchesFetch(),
    watchNBAMatchesPagination()
  ]
}
