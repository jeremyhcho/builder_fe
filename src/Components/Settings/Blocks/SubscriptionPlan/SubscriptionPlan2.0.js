import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Helpers
import { planFactory } from 'Helpers'

// CSS
import './Subscriptions.scss'

const SubscriptionPlan = ({ plan, active, history, authorized }) => {
  const navigateToSubscriptions = () => {
    return authorized ? history.push({ pathname: '/settings/subscription', state: { from: '/' } })
      : history.push({ pathname: '/auth/login', state: { from: '/' } })
  }

  return (
    <div
      styleName={active === plan ? 'subscription-plan active' : 'subscription-plan'}
    >
      <p
        style={{ color: planFactory[plan].color }}
        styleName="plan"
      >
        {plan.split('-')[0].toUpperCase()}
      </p>

      <div styleName="price">
        {
          plan === 'trial' ? (
            <span styleName="amount" className="semibold">{planFactory[plan].price}</span>
          ) : (
            [
              <span key="dollar" className="semibold" styleName="dollar">$</span>,
              <span key="amount" className="semibold" styleName="amount">{planFactory[plan].price}</span>,
              <span key="mo" className="small" style={{ letterSpacing: '0.5px' }}>/mo</span>
            ]
          )
        }
      </div>

      <div styleName="features-container">
        {
          planFactory[plan].features.map(feature => (
            <p key={feature}>{feature}</p>
          ))
        }
      </div>

      <button
        styleName='action2 blue'
        style={{ marginBottom: '10px' }}
        onClick={navigateToSubscriptions}
      >
        Subscribe
      </button>
    </div>
  )
}

SubscriptionPlan.propTypes = {
  plan: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  authorized: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized
})

export default withRouter(connect(
  mapStateToProps
)(SubscriptionPlan))
