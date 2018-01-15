import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import {
  getSummaryData,
  getQuartersData,
  getRecentGamesData,
  getStartingLineupData,
  getInjuriesData,
  getNBALines
} from 'Apis'

// Constants
import {
  FETCH_NBA_SUMMARY,
  FETCH_NBA_QUARTERS,
  FETCH_NBA_RECENT_GAMES,
  FETCH_NBA_STARTING_LINEUP,
  FETCH_NBA_INJURIES,
  FETCH_NBA_LINES
} from 'Constants'

// Actions
import {
  fetchNBASummarySuccess,
  fetchNBAQuartersSuccess,
  fetchNBARecentGamesSuccess,
  fetchNBAStartingLineupSuccess,
  fetchNBAInjuriesSuccess,
  fetchNBALinesSuccess
} from 'Actions'

function* getSummary ({ id }) {
  try {
    const summary = yield call(getSummaryData, id)
    yield put(fetchNBASummarySuccess(summary))
  } catch ({ response }) {
    console.log('no summaries found: ', response)
  }
}

function* getQuarters ({ id }) {
  try {
    const quarters = yield call(getQuartersData, id)
    yield put(fetchNBAQuartersSuccess(quarters))
  } catch ({ response }) {
    console.log('no quarters found: ', response)
  }
}

function* getRecentGames ({ id }) {
  try {
    const recentGames = yield call(getRecentGamesData, id)
    yield put(fetchNBARecentGamesSuccess(recentGames))
  } catch ({ response }) {
    console.log('no recent games found: ', response)
  }
}

function* getStartingLineup ({ id }) {
  try {
    const startingLineup = yield call(getStartingLineupData, id)
    yield put(fetchNBAStartingLineupSuccess(startingLineup))
  } catch ({ response }) {
    console.log('no starting lineup found: ', response)
  }
}

function* getInjuries ({ id }) {
  try {
    const injuries = yield call(getInjuriesData, id)
    yield put(fetchNBAInjuriesSuccess(injuries))
  } catch ({ response }) {
    console.log('no injuries found: ', response)
  }
}

function* getLines ({ matchId }) {
  try {
    const lines = yield call(getNBALines, matchId)
    console.log('fetched lines: ', lines)
    yield put(fetchNBALinesSuccess(lines))
  } catch ({ response }) {
    console.log('no vegas lines found: ', response)
  }
}

function* watchSummaryFetch () {
  yield takeLatest(FETCH_NBA_SUMMARY, getSummary)
}

function* watchQuartersFetch () {
  yield takeLatest(FETCH_NBA_QUARTERS, getQuarters)
}

function* watchRecentGamesFetch () {
  yield takeLatest(FETCH_NBA_RECENT_GAMES, getRecentGames)
}

function* watchStartingLineupFetch () {
  yield takeLatest(FETCH_NBA_STARTING_LINEUP, getStartingLineup)
}

function* watchInjuriesFetch () {
  yield takeLatest(FETCH_NBA_INJURIES, getInjuries)
}

function* watchLinesFetch () {
  yield takeLatest(FETCH_NBA_LINES, getLines)
}

export default function* overviewSaga () {
  yield all([
    watchSummaryFetch(),
    watchQuartersFetch(),
    watchRecentGamesFetch(),
    watchStartingLineupFetch(),
    watchInjuriesFetch(),
    watchLinesFetch()
  ])
}
