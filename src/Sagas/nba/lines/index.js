import { put, call, takeLatest, } from 'redux-saga/effects'

// Apis
import {
  getNBALines
} from 'Apis'

// Constants
import {
  FETCH_NBA_LINES,
  FETCH_NBA_LINES_SUCCESS,
  FETCH_NBA_LINES_FAIL
} from 'Constants'

function* callFetchNBALines ({ matchId }) {
  try {
    const lines = call(getNBALines, matchId)
    console.log('VEGAS LINSE FETCHED: ', lines)
    yield put({ type: FETCH_NBA_LINES_SUCCESS, lines })
  } catch ({ response }) {
    console.log('Failed to fetch NBA lines')
    yield put({ type: FETCH_NBA_LINES_FAIL })
  }
}

function* watchFetchLines () {
  yield takeLatest(FETCH_NBA_LINES, callFetchNBALines)
}

export default function* linesSaga () {
  yield [
    watchFetchLines()
  ]
}
