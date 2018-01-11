import { put, call, takeLatest, all } from 'redux-saga/effects'
import { push } from 'react-router-redux'

// Apis
import {
  createUser,
  updateUser,
  sendRecoveryEmail,
  fetchUser,
  fetchBillingInformation,
  createBillingInformation,
  updateBillingInformation,
  createSubscription,
  updateSubscription,
  fetchSubscription
} from 'Apis'

// Constants
import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
  SEND_RECOVERY_EMAIL,
  SEND_RECOVERY_EMAIL_FAIL,
  SEND_RECOVERY_EMAIL_SUCCESS,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_BILLING,
  FETCH_BILLING_SUCCESS,
  FETCH_BILLING_FAIL,
  CREATE_BILLING,
  CREATE_BILLING_SUCCESS,
  UPDATE_BILLING,
  UPDATE_BILLING_SUCCESS,
  FETCH_SUBSCRIPTION,
  FETCH_SUBSCRIPTION_SUCCESS,
  FETCH_SUBSCRIPTION_FAIL,
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_SUCCESS
} from 'Constants'

// Actions
import {
  authorize,
  unauthorize,
  createSubscriptionPlan
} from 'Actions'

// Helpers
import errorMessage from 'Helpers/errorMessage'

function* callCreateUser (user) {
  try {
    const response = yield call(createUser, user)
    yield put({ type: CREATE_USER_SUCCESS, user: response.data })
  } catch ({ response }) {
    yield put(unauthorize())
    yield put({ type: CREATE_USER_FAIL, error: errorMessage(response) })
  }
}

function* callUpdateUserPassword ({ userId, params }) {
  try {
    yield call(updateUser, userId, params)
    yield put(push({ pathname: '/auth/login', state: { resetPassword: true } }))
    yield put({ type: UPDATE_USER_PASSWORD_SUCCESS })
  } catch ({ response }) {
    yield put({ type: UPDATE_USER_PASSWORD_FAIL, error: errorMessage(response) })
  }
}

function* callSendRecoveryEmail ({ email }) {
  try {
    yield call(sendRecoveryEmail, email)
    yield put({ type: SEND_RECOVERY_EMAIL_SUCCESS })
  } catch ({ response }) {
    yield put({ type: SEND_RECOVERY_EMAIL_FAIL, error: errorMessage(response) })
  }
}

function* callFetchUser () {
  try {
    const user = yield call(fetchUser)
    yield put(authorize())
    yield put({ type: FETCH_USER_SUCCESS, user: user.data })
  } catch ({ response }) {
    yield put(unauthorize())
  }
}

function* callFetchBilling ({ userId }) {
  try {
    const billing = yield call(fetchBillingInformation, userId)
    yield put({ type: FETCH_BILLING_SUCCESS, billing: billing.data })
  } catch ({ response }) {
    yield put({ type: FETCH_BILLING_FAIL })
  }
}

function* callCreateBilling ({ token, plan }) {
  try {
    const billing = yield call(createBillingInformation, token)
    yield put({ type: CREATE_BILLING_SUCCESS, billing: billing.data })
    yield put(createSubscriptionPlan(plan))
  } catch ({ response }) {
    console.log('Failed to create billing information')
  }
}

function* callUpdatingBilling ({ userId, token }) {
  try {
    const billing = yield call(updateBillingInformation, userId, token)
    yield put({ type: UPDATE_BILLING_SUCCESS, billing: billing.data })
  } catch ({ response }) {
    console.log('Failed to update billing information')
  }
}

function* callCreateSubscription ({ plan }) {
  try {
    const subscriptionPlan = yield call(createSubscription, plan)
    yield put({ type: CREATE_SUBSCRIPTION_SUCCESS, subscriptionPlan: subscriptionPlan.data })
  } catch ({ response }) {
    console.log('Failed to create subscription')
  }
}

function* callUpdateSubscription ({ userId, plan }) {
  try {
    const subscriptionPlan = yield call(updateSubscription, userId, plan)
    yield put({ type: UPDATE_SUBSCRIPTION_SUCCESS, subscriptionPlan: subscriptionPlan.data })
  } catch ({ response }) {
    console.log('Failed to update subscription')
  }
}

function* callFetchSubscription ({ userId }) {
  try {
    const subscriptionPlan = yield call(fetchSubscription, userId)
    yield put({ type: FETCH_SUBSCRIPTION_SUCCESS, subscriptionPlan: subscriptionPlan.data })
  } catch ({ response }) {
    yield put({ type: FETCH_SUBSCRIPTION_FAIL })
  }
}

function* watchCreateUser () {
  yield takeLatest(CREATE_USER, callCreateUser)
}

function* watchUpdateUserPassword () {
  yield takeLatest(UPDATE_USER_PASSWORD, callUpdateUserPassword)
}

function* watchSendRecoveryEmail () {
  yield takeLatest(SEND_RECOVERY_EMAIL, callSendRecoveryEmail)
}

function* watchFetchUser () {
  yield takeLatest(FETCH_USER, callFetchUser)
}

function* watchFetchBilling () {
  yield takeLatest(FETCH_BILLING, callFetchBilling)
}

function* watchCreateBilling () {
  yield takeLatest(CREATE_BILLING, callCreateBilling)
}

function* watchUpdateBilling () {
  yield takeLatest(UPDATE_BILLING, callUpdatingBilling)
}

function* watchCreateSubscription () {
  yield takeLatest(CREATE_SUBSCRIPTION, callCreateSubscription)
}

function* watchUpdateSubscription () {
  yield takeLatest(UPDATE_SUBSCRIPTION, callUpdateSubscription)
}

function* watchFetchSubscription () {
  yield takeLatest(FETCH_SUBSCRIPTION, callFetchSubscription)
}

export default function* userSaga () {
  yield all([
    watchCreateUser(),
    watchUpdateUserPassword(),
    watchSendRecoveryEmail(),
    watchFetchUser(),
    watchFetchBilling(),
    watchCreateBilling(),
    watchUpdateBilling(),
    watchCreateSubscription(),
    watchUpdateSubscription(),
    watchFetchSubscription()
  ])
}
