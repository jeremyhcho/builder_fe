import { put, call, takeLatest } from 'redux-saga/effects'

import { getTeamDetailsData } from 'Apis'

import { FETCH_NBA_TEAM_DETAILS } from 'Constants'

import { receiveNBATeamDetails } from 'Actions'

function* getNBATeamDetails ({ id }) {
  try {
    const teamDetails = yield call(getTeamDetailsData)
    yield put(receiveNBATeamDetails(teamDetails))
  } catch ({ response }) {
    console.log('no team details found: ', response)
  }
}

function* watchNBATeamDetailsFetch () {
  yield takeLatest(FETCH_NBA_TEAM_DETAILS, getNBATeamDetails)
}

export default function* teamDetailsOverviewSaga () {
  yield [
    watchNBATeamDetailsFetch()
  ]
}
