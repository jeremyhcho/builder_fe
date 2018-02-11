import { createRoutine } from 'Routines'

import { openSnackbar } from 'Actions'

// Apis
import {
  postBillingInformation,
  getBillingInformation,
  putBillingInformation,
  postSubscription,
  getSubscription,
  putSubscription,
  deleteSubscription
} from 'Apis'

// Constants
import {
  FETCH_BILLING,
  UPDATE_BILLING,
  CREATE_BILLING,
  CREATE_SUBSCRIPTION,
  CREATE_INITIAL_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
  FETCH_SUBSCRIPTION,
  DELETE_SUBSCRIPTION
} from 'Constants'

export const createBillingInformation = createRoutine({
  prefix: CREATE_BILLING,
  api: postBillingInformation,
  reducerKey: ['billing'],
  transform: 'replace'
})

export const fetchBillingInformation = createRoutine({
  prefix: FETCH_BILLING,
  api: getBillingInformation,
  reducerKey: ['billing'],
  transform: 'replace'
})

export const updateBillingInformation = createRoutine({
  prefix: UPDATE_BILLING,
  api: putBillingInformation,
  reducerKey: ['billing'],
  transform: 'replace'
})

export const fetchSubscriptionPlan = createRoutine({
  prefix: FETCH_SUBSCRIPTION,
  api: getSubscription,
  reducerKey: ['subscription'],
  transform: 'replace'
})

export const createInitialSubscriptionPlan = createRoutine({
  prefix: CREATE_INITIAL_SUBSCRIPTION,
  api: postSubscription,
  reducerKey: ['subscription'],
  transform: (response) => [response],
  onSuccess: () => openSnackbar('Subscription created', 3000)
})

export const createSubscriptionPlan = createRoutine({
  prefix: CREATE_SUBSCRIPTION,
  api: postSubscription,
  reducerKey: ['subscription'],
  transform: 'concat',
  onSuccess: () => openSnackbar('Subscription created', 3000)
})

export const updateSubscriptionPlan = createRoutine({
  prefix: UPDATE_SUBSCRIPTION,
  api: putSubscription,
  reducerKey: ['subscription'],
  transform: 'updateByIdAndReplace',
  onSuccess: () => openSnackbar('Subscription updated', 3000)
})

export const deleteSubscriptionPlan = createRoutine({
  prefix: DELETE_SUBSCRIPTION,
  api: deleteSubscription,
  reducerKey: ['subscription'],
  transform: 'removeById',
  onSuccess: () => openSnackbar('Subscription canceled', 3000)
})
