import overviewSaga from './overview'
import playerStatsSaga from './playerstats'
import teamStatsSaga from './teamstats'

export default function* gameDetailsSaga() {
  yield [
    overviewSaga(),
    teamStatsSaga(),
    playerStatsSaga()
  ]
}
