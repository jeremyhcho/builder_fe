import { all } from 'redux-saga/effects'
import userSaga from './user'

import {
  resetSaga,
  loginSaga,
  verifySaga
} from './auth'

import routineSaga from './routine'
import { notificationsSaga } from './global'
import nbaSaga from './nba'

export default function* rootSaga() {
  yield all([
    loginSaga(),
    userSaga(),
    resetSaga(),
    notificationsSaga(),
    verifySaga(),
    routineSaga(),
    nbaSaga()
  ])
}
