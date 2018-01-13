import { axios } from 'Apis'

export const createUser = (params) => (
  axios.post('/api/v1/users', params)
)

export const updateUser = (userId, params) => (
  axios.put(`/api/v1/users/${userId}`, params)
)

export const sendRecoveryEmail = (email) => (
  axios.post('/api/v1/users/recover', { email })
)

export const validateResetToken = (params) => (
  axios.get('/api/v1/users/validate_reset', { params })
)

export const fetchUser = () => (
  axios.get('/api/v1/users/current')
)

export const createBillingInformation = (token) => (
  axios.post('/api/v1/billing', {
    source: token
  })
)

export const updateBillingInformation = (userId, token) => (
  axios.put(`/api/v1/billing/${userId}`, {
    source: token
  })
)

export const fetchBillingInformation = (userId) => (
  axios.get(`/api/v1/billing/${userId}`)
)

export const createSubscription = (plan) => (
  axios.post('/api/v1/subscriptions', {
    plan
  })
)

export const updateSubscription = (userId, plan) => (
  axios.put(`/api/v1/subscriptions/${userId}`, {
    plan
  })
)

export const fetchSubscription = (userId) => (
  axios.get(`/api/v1/subscriptions/${userId}`)
)

export const deleteSubscription = (userId) => (
  axios.delete(`/api/v1/subscriptions/${userId}`)
)

export const verifyUser = (params) => (
  axios.put('/api/v1/users/verify', params)
)

export const resendVerificationEmail = (userId) => (
  axios.post(`/api/v1/users/${userId}/resend_verify`)
)
