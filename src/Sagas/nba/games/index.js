import { put, call, takeLatest, all } from 'redux-saga/effects'

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

function* getGames (params) {
  try {
    const from = params.from.toDate().toISOString()
    const to = params.to.toDate().toISOString()
    const nbaGames = yield call(getNBAGames, { from, to })
    yield put(fetchNBAGamesSuccess(nbaGames))
  } catch ({ response }) {
    // HANDLE ERROR HANDLE ERROR HANDLE ERROR HANDLE ERROR @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    console.log('no matches found: ', response)
  }
}

function* paginateGames ({ from, to, paginateType }) {
  try {
    const fromString = from.toDate().toISOString()
    const toString = to.toDate().toISOString()
    const nbaGames = yield call(getNBAGames, { from: fromString, to: toString })
    yield put(paginateNBAGamesSuccess(nbaGames, paginateType))
  } catch ({ response }) {
    // HANDLE ERROR HANDLE ERROR HANDLE ERROR HANDLE ERROR @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    console.log('no matches found: ', response)
  }
}

function* watchGamesFetch () {
  yield takeLatest(FETCH_NBA_GAMES, getGames)
}

function* watchGamesPagination () {
  yield takeLatest(PAGINATE_NBA_GAMES, paginateGames)
}

export default function* gamesSaga () {
  yield all([
    watchGamesFetch(),
    watchGamesPagination()
  ])
}
