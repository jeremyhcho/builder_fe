import { VERIFY_USER, RESEND_VERIFICATION_EMAIL } from 'Constants'

export const verifyUser = (params) => ({
  type: VERIFY_USER,
  params
})

export const resendVerificationEmail = (userId) => ({
  type: RESEND_VERIFICATION_EMAIL,
  userId
})
