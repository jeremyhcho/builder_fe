// Constants
import {
  FETCH_BILLING,
  UPDATE_BILLING,
  CREATE_BILLING
} from 'Constants'

export const createBillingInformation = (token) => ({
  type: CREATE_BILLING,
  token
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
