import { all } from 'redux-saga/effects'
import userSaga from './user'

import {
  resetSaga,
  loginSaga,
  verifySaga
} from './auth'

import nbaSaga from './nba'
import { notificationsSaga } from './global'

export default function* rootSaga() {
  yield all([
    loginSaga(),
    userSaga(),
    resetSaga(),
    nbaSaga(),
    notificationsSaga(),
    verifySaga()
  ])
}
