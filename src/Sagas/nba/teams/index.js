import { put, call, takeLatest } from 'redux-saga/effects'

// Apis
import { getNBATeamsData } from 'Apis'

// Actions
import { fetchNBATeamsSuccess } from 'Actions'

// Constants
import { FETCH_NBA_TEAMS } from 'Constants'


function* getTeams () {
  try {
    const nbaTeams = yield call(getNBATeamsData)
    yield put(fetchNBATeamsSuccess(nbaTeams))
  } catch ({ response }) {
    // HANDLE ERROR HANDLE ERROR HANDLE ERROR HANDLE ERROR @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    console.log('no teams found: ', response)
  }
}

function* watchTeamsFetch () {
  yield takeLatest(FETCH_NBA_TEAMS, getTeams)
}

export default function* teamsSaga () {
  yield [
    watchTeamsFetch()
  ]
}
