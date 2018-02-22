import React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { planFactory } from 'Helpers'

// CSS
import '../LandingPage.scss'

const SubscriptionPlan = ({ plan, color, active }) => {
  return (
    <div
      styleName={active === plan ? 'subscription-plan active' : 'subscription-plan'}
    >
      <p styleName="plan">{plan.split('-')[0].toUpperCase()}</p>

      <div styleName="price">
        <span className="semibold" styleName="dollar">$</span>
        <span className="semibold" styleName="amount">{planFactory[plan].price}</span>
        <span className="small" style={{ letterSpacing: '0.5px' }}>/mo</span>
      </div>

      {
        planFactory[plan].features.map(feature => (
          <p key={feature}>{feature}</p>
        ))
      }

      <button styleName={`action ${color}`}>Subscribe</button>
    </div>
  )
}

SubscriptionPlan.propTypes = {
  plan: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired
}

export default SubscriptionPlan
