import { createSelector } from 'reselect'

const getSubscriptions = (routines) => routines.auth.subscription

const makeFilterSubscriptions = () => {
  return createSelector(
    getSubscriptions,
    (subscriptions) => {
      if (!subscriptions) return { subscription: null, canceledSubscription: null }

      return {
        subscription: subscriptions.filter(plan => !plan.cancel_at_period_end)[0],
        canceledSubscriptions: subscriptions.filter(plan => plan.cancel_at_period_end)
      }
    }
  )
}

export default makeFilterSubscriptions
