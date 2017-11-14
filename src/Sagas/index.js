import { takeLatest } from 'redux-saga/effects'

function* testSaga () {
  yield takeLatest('TEST', () => console.log('Nothing happening here yet.'))
}

export default function* rootSaga() {
  yield [
    testSaga()
  ]
}
