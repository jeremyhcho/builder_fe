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
  teamStatsSaga
} from './matchDetails'

export default function* rootSaga() {
  yield [
    loginSaga(),
    userSaga(),
    resetSaga(),
    nbaSaga(),
    overviewSaga(),
    teamStatsSaga(),
  ]
}
