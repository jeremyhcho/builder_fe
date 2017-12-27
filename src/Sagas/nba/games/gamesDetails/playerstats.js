import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import {
  getPlayerStatsData
} from 'Apis'

// Constants
import {
  FETCH_NBA_PLAYER_STATS
} from 'Constants'

// Actions
import {
  fetchNBAPlayerStatsSuccess
} from 'Actions'

function* getPlayerStats ({ id }) {
  try {
    const playerStats = yield call(getPlayerStatsData, id)
    yield put(fetchNBAPlayerStatsSuccess(playerStats))
  } catch ({ response }) {
    console.log('no player stats found ', response)
  }
}

function* watchPlayerStatsFetch () {
  yield takeLatest(FETCH_NBA_PLAYER_STATS, getPlayerStats)
}

export default function* playerStatsSaga () {
  yield [
    watchPlayerStatsFetch()
  ]
}
