import { userSaga } from './users'

import {
  resetSaga,
  loginSaga
} from './auth'

export default function* rootSaga() {
  yield [
    loginSaga(),
    userSaga(),
    resetSaga()
  ]
}
