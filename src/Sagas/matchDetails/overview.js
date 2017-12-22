import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import {
  getSummaryData,
  getQuartersData,
  getRecentGamesData,
  getStartingLineupData
} from 'Apis'

// Constants
import {
  FETCH_NBA_SUMMARY,
  FETCH_NBA_QUARTERS,
  FETCH_NBA_RECENT_GAMES,
  FETCH_NBA_STARTING_LINEUP
} from 'Constants'

// Actions
import {
  receiveNBASummary,
  receiveNBAQuarters,
  receiveNBARecentGames,
  receiveNBAStartingLineup
} from 'Actions'

function* getSummary ({ id }) {
  try {
    const summary = yield call(getSummaryData, id)
    yield put(receiveNBASummary(summary))
  } catch ({ response }) {
    console.log('no summaries found: ', response)
  }
}

function* getQuarters ({ id }) {
  try {
    const quarters = yield call(getQuartersData, id)
    yield put(receiveNBAQuarters(quarters))
  } catch ({ response }) {
    console.log('no quarters found: ', response)
  }
}

function* getRecentGames ({ id }) {
  try {
    const recentGames = yield call(getRecentGamesData, id)
    yield put(receiveNBARecentGames(recentGames))
  } catch ({ response }) {
    console.log('no recent games found: ', response)
  }
}


function* getStartingLineup ({ id }) {
  try {
    const startingLineup = yield call(getStartingLineupData, id)
    yield put(receiveNBAStartingLineup(startingLineup))
  } catch ({ response }) {
    console.log('no starting lineup found: ', response)
  }
}

function* watchNBASummaryFetch () {
  yield takeLatest(FETCH_NBA_SUMMARY, getSummary)
}

function* watchNBAQuartersFetch () {
  yield takeLatest(FETCH_NBA_QUARTERS, getQuarters)
}

function* watchNBARecentGamesFetch () {
  yield takeLatest(FETCH_NBA_RECENT_GAMES, getRecentGames)
}

function* watchNBAStartingLineupFetch () {
  yield takeLatest(FETCH_NBA_STARTING_LINEUP, getStartingLineup)
}

export default function* overviewSaga () {
  yield [
    watchNBASummaryFetch(),
    watchNBAQuartersFetch(),
    watchNBARecentGamesFetch(),
    watchNBAStartingLineupFetch()
  ]
}
