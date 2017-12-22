import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import {
  getTeamStatsData
} from 'Apis'

// Constants
import {
  FETCH_NBA_TEAM_STATS
} from 'Constants'

// Actions
import {
  receiveNBATeamStats
} from 'Actions'

function* getTeamStats ({ id }) {
  try {
    const teamStats = yield call(getTeamStatsData, id)
    yield put(receiveNBATeamStats(teamStats))
  } catch ({ response }) {
    console.log('no team stats found ', response)
  }
}

function* watchNBATeamStatsFetch () {
  yield takeLatest(FETCH_NBA_TEAM_STATS, getTeamStats)
}

export default function* teamStatsSaga() {
  yield [
    watchNBATeamStatsFetch()
  ]
}
