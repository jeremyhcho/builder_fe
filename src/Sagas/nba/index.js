import { all } from 'redux-saga/effects'
// games
import gamesSaga from './games'
import gameDetailsSaga from './games/gameDetails'

// teams
import teamsSaga from './teams'

// models
import modelsSaga from './models'

export default function* nbaSaga() {
  yield all([
    gamesSaga(),
    gameDetailsSaga(),
    teamsSaga(),
    modelsSaga()
  ])
}
