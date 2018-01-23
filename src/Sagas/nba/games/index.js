import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import { getNBAGames } from 'Apis'

// Constants
import { FETCH_NBA_GAMES } from 'Constants'

// Actions
import { fetchNBAGamesSuccess } from 'Actions'

function* getGames (params) {
  try {
    const from = params.from.toDate().toISOString()
    const to = params.to.toDate().toISOString()
    const nbaGames = yield call(getNBAGames, { from, to })
    yield put(fetchNBAGamesSuccess(nbaGames))
  } catch ({ response }) {
    console.log('no matches found: ', response)
  }
}

function* watchGamesFetch () {
  yield takeLatest(FETCH_NBA_GAMES, getGames)
}

export default function* gamesSaga () {
  yield all([
    watchGamesFetch(),
  ])
}
