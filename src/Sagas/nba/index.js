import { all } from 'redux-saga/effects'
// games
import gamesSaga from './games'
import gameDetailsSaga from './games/gamesDetails'

// teams
import teamsSaga from './teams'

// models
import modelsSaga from './models'

// lines
import linesSaga from './lines'

export default function* nbaSaga() {
  yield all([
    gamesSaga(),
    gameDetailsSaga(),
    teamsSaga(),
    modelsSaga(),
    linesSaga()
  ])
}
