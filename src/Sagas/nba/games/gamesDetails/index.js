import { all } from 'redux-saga/effects'
import overviewSaga from './overview'
import playerStatsSaga from './playerstats'
import teamStatsSaga from './teamstats'

export default function* gameDetailsSaga() {
  yield all([
    overviewSaga(),
    teamStatsSaga(),
    playerStatsSaga()
  ])
}
