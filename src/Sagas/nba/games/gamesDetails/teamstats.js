import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import {
  getTeamStatsData,
  getKeyStatsData
} from 'Apis'

// Constants
import {
  FETCH_NBA_TEAM_STATS,
  FETCH_NBA_KEY_STATS
} from 'Constants'

// Actions
import {
  fetchNBATeamStatsSuccess,
  fetchNBAKeyStatsSuccess
} from 'Actions'

function* getTeamStats ({ id }) {
  try {
    const teamStats = yield call(getTeamStatsData, id)
    yield put(fetchNBATeamStatsSuccess(teamStats))
  } catch ({ response }) {
    console.log('no team stats found ', response)
  }
}

function* getKeyStats ({ id }) {
  try {
    const keyStats = yield call(getKeyStatsData, id)
    yield put(fetchNBAKeyStatsSuccess(keyStats))
  } catch ({ response }) {
    console.log('no key differences found from team stats ', response)
  }
}

function* watchTeamStatsFetch () {
  yield takeLatest(FETCH_NBA_TEAM_STATS, getTeamStats)
}

function* watchKeyStatsFetch () {
  yield takeLatest(FETCH_NBA_KEY_STATS, getKeyStats)
}

export default function* teamStatsSaga() {
  yield [
    watchTeamStatsFetch(),
    watchKeyStatsFetch()
  ]
}
