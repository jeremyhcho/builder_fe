// Constants
import {
  FETCH_BILLING,
  UPDATE_BILLING,
  CREATE_BILLING,
  CREATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION
} from 'Constants'

export const createBillingInformation = (token, plan) => ({
  type: CREATE_BILLING,
  token,
  plan
})

export const fetchBillingInformation = (userId) => ({
  type: FETCH_BILLING,
  userId
})

export const updateBillingInformation = (userId, token) => ({
  type: UPDATE_BILLING,
  userId,
  token
})

export const createSubscriptionPlan = (plan) => ({
  type: CREATE_SUBSCRIPTION,
  plan
})

export const updateSubscriptionPlan = (userId, plan) => ({
  type: UPDATE_SUBSCRIPTION,
  userId,
  plan
})
