import {
  AUTHORIZE,
  UNAUTHORIZE,
  FETCH_USER_SUCCESS,
  CREATE_USER_SUCCESS,
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
  CREATE_SUBSCRIPTION_FAIL,
  UPDATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAIL,
  DELETE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_FAIL,
  LOGIN_SUCCESS
} from 'Constants'

const initialState = {
  authorized: false,
  user: {},
  fetchingBilling: false,
  fetchingSubscription: false,
  updatingBilling: false,
  creatingBilling: false,
  creatingSubscription: false,
  deletingSubscription: false,
  updatingSubscription: false,
  fetchingUser: true
}

const authState = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZE:
      return { ...state, authorized: true, fetchingUser: false }

    case UNAUTHORIZE:
      return { ...state, authorized: false, fetchingUser: false }

    case FETCH_USER_SUCCESS:
      return { ...state, user: action.user, fetchingUser: false }

    // Billing Actions
    case FETCH_BILLING:
      return { ...state, fetchingBilling: true }

    case FETCH_BILLING_FAIL: {
      const userInformation = {
        ...state.user,
        billing: {}
      }

      return { ...state, fetchingBilling: false, user: userInformation }
    }

    case FETCH_BILLING_SUCCESS: {
      const userInformation = {
        ...state.user,
        billing: action.billing
      }

      return { ...state, user: userInformation, fetchingBilling: false }
    }

    case CREATE_BILLING:
      return { ...state, creatingBilling: true }

    case CREATE_BILLING_SUCCESS: {
      const userInformation = {
        ...state.user,
        billing: action.billing
      }

      return { ...state, user: userInformation, creatingBilling: false }
    }

    case UPDATE_BILLING:
      return { ...state, updatingBilling: true }

    case UPDATE_BILLING_SUCCESS: {
      const userInformation = {
        ...state.user,
        billing: action.billing
      }

      return { ...state, user: userInformation, updatingBilling: false }
    }

    case FETCH_SUBSCRIPTION:
      return { ...state, fetchingSubscription: true }

    case FETCH_SUBSCRIPTION_FAIL:
      return { ...state, fetchingSubscription: false }

    case FETCH_SUBSCRIPTION_SUCCESS: {
      const userInformation = {
        ...state.user,
        subscription: action.subscription.data.filter(plan => !plan.cancel_at_period_end)[0],
        canceledSubscriptions: action.subscription.data.filter(plan => plan.cancel_at_period_end)
      }

      return { ...state, user: userInformation, fetchingSubscription: false }
    }

    case CREATE_SUBSCRIPTION: {
      return { ...state, creatingSubscription: true }
    }

    case CREATE_SUBSCRIPTION_SUCCESS: {
      const userInformation = {
        ...state.user,
        subscription: action.subscription
      }

      return { ...state, user: userInformation, creatingSubscription: false }
    }

    case CREATE_SUBSCRIPTION_FAIL:
      return { ...state, creatingSubscription: false }

    case UPDATE_SUBSCRIPTION:
      return { ...state, updatingSubscription: true }

    case UPDATE_SUBSCRIPTION_SUCCESS: {
      const userInformation = {
        ...state.user,
        subscription: action.subscription.data
      }

      return { ...state, user: userInformation, updatingSubscription: false }
    }

    case UPDATE_SUBSCRIPTION_FAIL:
      return { ...state, updatingSubscription: false }

    case DELETE_SUBSCRIPTION:
      return { ...state, deletingSubscription: true }

    case DELETE_SUBSCRIPTION_SUCCESS: {
      const userInformation = {
        ...state.user,
        subscription: null
      }

      return { ...state, user: userInformation, deletingSubscription: false }
    }

    case DELETE_SUBSCRIPTION_FAIL:
      return { ...state, deletingSubscription: false }

    case CREATE_USER_SUCCESS:
      return { ...state, user: action.user, fetchingUser: false }

    case LOGIN_SUCCESS:
      return { ...state, user: action.user.data }

    default:
      return state
  }
}

export default authState
