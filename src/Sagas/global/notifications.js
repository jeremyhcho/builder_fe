import { put, call, takeLatest, all } from 'redux-saga/effects'

// Apis
import {
  apiFetchNotifications,
  apiReadNotifications
} from 'Apis'

// Constants
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  READ_NOTIFICATIONS
} from 'Constants'

function* callFetchNotifications () {
  try {
    const notifications = yield call(apiFetchNotifications)
    yield put({ type: FETCH_NOTIFICATIONS_SUCCESS, notifications })
  } catch ({ response }) {
    console.log(response)
  }
}

function* callReadNotifications () {
  try {
    yield call(apiReadNotifications)
  } catch ({ response }) {
    console.log(response)
  }
}

function* watchFetchNotifications () {
  yield takeLatest(FETCH_NOTIFICATIONS, callFetchNotifications)
}

function* watchReadNotifications () {
  yield takeLatest(READ_NOTIFICATIONS, callReadNotifications)
}

export default function* notificationsSaga () {
  yield all([
    watchFetchNotifications(),
    watchReadNotifications()
  ])
}
