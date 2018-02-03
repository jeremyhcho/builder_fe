import { axios } from 'Apis'

export const createUser = (params) => (
  axios.post('/api/v1/users', params)
)

export const updateUser = (userId, params) => (
  axios.put(`/api/v1/users/${userId}`, params)
)

export const updatePassword = ({ currentPassword, newPassword }) => (
  axios.post('/api/v1/users/change_password', {
    current_password: currentPassword,
    password: newPassword
  })
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

// Billing and Subscription
export const postBillingInformation = (token) => (
  axios.post('/api/v1/billing', {
    source: token
  })
)

export const putBillingInformation = (userId, token) => (
  axios.put(`/api/v1/billing/${userId}`, {
    source: token
  })
)

export const getBillingInformation = (userId) => (
  axios.get(`/api/v1/billing/${userId}`)
)

export const postSubscription = (plan) => (
  axios.post('/api/v1/subscriptions', {
    plan
  })
)

export const putSubscription = (userId, plan) => (
  axios.put(`/api/v1/subscriptions/${userId}`, {
    plan
  })
)

export const getSubscription = (userId) => (
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
