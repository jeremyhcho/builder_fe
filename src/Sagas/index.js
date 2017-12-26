import userSaga from './user'

import {
  resetSaga,
  loginSaga
} from './auth'

import {
  nbaSaga
} from './matches'

import {
  overviewSaga,
  teamStatsSaga,
  playerStatsSaga
} from './matchDetails'

export default function* rootSaga() {
  yield [
    loginSaga(),
    userSaga(),
    resetSaga(),
    nbaSaga(),
    overviewSaga(),
    teamStatsSaga(),
    playerStatsSaga()
  ]
}
