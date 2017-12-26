import userSaga from './user'

import {
  resetSaga,
  loginSaga
} from './auth'

import nbaSaga from './nba'

export default function* rootSaga() {
  yield [
    loginSaga(),
    userSaga(),
    resetSaga(),
    nbaSaga(),
  ]
}
