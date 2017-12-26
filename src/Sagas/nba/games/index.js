import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import {
  getNBAGames
} from 'Apis'

// Constants
import {
  FETCH_NBA_GAMES,
  PAGINATE_NBA_GAMES
} from 'Constants'

// Actions
import { fetchNBAGamesSuccess, paginateNBAGamesSuccess } from 'Actions'

function* getMatches (params) {
  try {
    const from = params.from.toDate().toISOString()
    const to = params.to.toDate().toISOString()
    const nbaMatches = yield call(getNBAGames, { from, to })
    yield put(fetchNBAGamesSuccess(nbaMatches))
  } catch ({ response }) {
    // HANDLE ERROR HANDLE ERROR HANDLE ERROR HANDLE ERROR @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    console.log('no matches found: ', response)
  }
}

function* paginateMatches ({ from, to, paginateType }) {
  try {
    const fromString = from.toDate().toISOString()
    const toString = to.toDate().toISOString()
    const { data } = yield call(getNBAGames, { from: fromString, to: toString })
    yield put(paginateNBAGamesSuccess(data, paginateType))
  } catch ({ response }) {
    // HANDLE ERROR HANDLE ERROR HANDLE ERROR HANDLE ERROR @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    console.log('no matches found: ', response)
  }
}

function* watchNBAMatchesFetch () {
  yield takeLatest(FETCH_NBA_GAMES, getMatches)
}

function* watchNBAMatchesPagination () {
  yield takeLatest(PAGINATE_NBA_GAMES, paginateMatches)
}

export default function* nbaSaga () {
  yield [
    watchNBAMatchesFetch(),
    watchNBAMatchesPagination()
  ]
}
