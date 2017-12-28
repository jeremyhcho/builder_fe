import { put, call, takeLatest, all } from 'redux-saga/effects'

import { getTeamDetailsData } from 'Apis'

import { FETCH_NBA_TEAM_DETAILS } from 'Constants'

import { fetchNBATeamDetailsSuccess } from 'Actions'

function* getTeamDetails ({ id }) {
  try {
    const teamDetails = yield call(getTeamDetailsData, id)
    yield put(fetchNBATeamDetailsSuccess(teamDetails))
  } catch ({ response }) {
    console.log('no team details found: ', response)
  }
}

function* watchTeamDetailsFetch () {
  yield takeLatest(FETCH_NBA_TEAM_DETAILS, getTeamDetails)
}

export default function* teamDetailsOverviewSaga () {
  yield all([
    watchTeamDetailsFetch()
  ])
}
