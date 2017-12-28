import { all } from 'redux-saga/effects'
// games
import gamesSaga from './games'
import gameDetailsSaga from './games/gamesDetails'

// teams
import teamsSaga from './teams'

export default function* nbaSaga() {
  yield all([
    gamesSaga(),
    gameDetailsSaga(),
    teamsSaga()
  ])
}
