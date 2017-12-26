// games
import gamesSaga from './games'
import gameDetailsSaga from './games/gameDetails'

// teams
import teamsSaga from './teams'

export default function* nbaSaga() {
  yield [
    gamesSaga(),
    gameDetailsSaga(),
    teamsSaga()
  ]
}
