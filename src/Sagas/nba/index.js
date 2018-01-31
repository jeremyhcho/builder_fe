import { put, takeLatest, all } from 'redux-saga/effects'

// Actions
import {
  fetchNBAPredictions,
  fetchNBAMatchup
} from 'Actions'

import {
  FETCH_NBA_MATCHES_MODELS,
  FETCH_NBA_MATCHUP,
  FETCH_NBA_PREVIOUS_MEETINGS
} from 'Constants'

function* callFetchInitialPredictions ({ response }) {
  try {
    const selectedModel = response.find(model => model.status === 'ACTIVE') || response[0]
    yield put(fetchNBAPredictions(selectedModel.id))
  } catch (error) {
    console.error('Failed to fetch nba initial predictions', error)
  }
}

function* callFetchMatchup ({ response }) {
  try {
    const initialMatchupId = response[0].id
    yield put(fetchNBAMatchup(initialMatchupId))
  } catch (error) {
    yield put({
      type: `${FETCH_NBA_MATCHUP}/FAIL`,
      key: {
        primaryKey: 'nba',
        type: 'matchup'
      },
      error
    })
    console.error('Failed to fetch nba matchup..no previous meetings found')
  }
}

function* watchFetchMatchModels () {
  yield takeLatest(`${FETCH_NBA_MATCHES_MODELS}/SUCCESS`, callFetchInitialPredictions)
}

function* watchFetchPreviousMeetings () {
  yield takeLatest(`${FETCH_NBA_PREVIOUS_MEETINGS}/SUCCESS`, callFetchMatchup)
}

export default function* nbaSaga () {
  yield all([
    watchFetchMatchModels(),
    watchFetchPreviousMeetings()
  ])
}
