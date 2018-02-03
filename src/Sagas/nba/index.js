import { put, takeLatest, all } from 'redux-saga/effects'

// Actions
import {
  fetchNBAPredictions,
  fetchNBAMatchup,
  createInitialSubscriptionPlan
} from 'Actions'

import {
  FETCH_NBA_MATCHES_MODELS,
  FETCH_NBA_MATCHUP,
  FETCH_NBA_PREVIOUS_MEETINGS,
  CREATE_BILLING,
  CREATE_SUBSCRIPTION
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

function* callCreateSubscription ({ payload }) {
  // payload from REQUEST Routines
  try {
    const plan = payload[1]
    yield put(createInitialSubscriptionPlan(plan))
  } catch (error) {
    yield put({
      type: `${CREATE_SUBSCRIPTION}/FAIL`,
      key: {
        primaryKey: 'auth',
        type: 'subscription'
      },
      error
    })
    console.error('Failed to create subscription during billing creation')
  }
}

function* watchFetchMatchModels () {
  yield takeLatest(`${FETCH_NBA_MATCHES_MODELS}/SUCCESS`, callFetchInitialPredictions)
}

function* watchFetchPreviousMeetings () {
  yield takeLatest(`${FETCH_NBA_PREVIOUS_MEETINGS}/SUCCESS`, callFetchMatchup)
}

function* watchCreateBillingInformation () {
  yield takeLatest(`${CREATE_BILLING}/SUCCESS`, callCreateSubscription)
}

export default function* nbaSaga () {
  yield all([
    watchFetchMatchModels(),
    watchFetchPreviousMeetings(),
    watchCreateBillingInformation()
  ])
}
