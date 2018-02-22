import React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { planFactory } from 'Helpers'

// CSS
import '../LandingPage.scss'

const SubscriptionPlan = ({ plan, active }) => {
  return (
    <div
      styleName={active === plan ? 'subscription-plan active' : 'subscription-plan'}
    >
      <p styleName="plan">{plan.split('-')[0].toUpperCase()}</p>

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

      <button styleName='action2 blue' style={{ marginBottom: '10px' }}>Subscribe</button>
    </div>
  )
}

SubscriptionPlan.propTypes = {
  plan: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired
}

export default SubscriptionPlan
