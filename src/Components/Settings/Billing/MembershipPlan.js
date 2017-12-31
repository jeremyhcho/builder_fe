import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Card, Button } from 'Components/Common'

// CSS
import './Billing.scss'

class MembershipPlan extends React.Component {
  planFactory (info) {
    const planInfo = {
      basic: {
        color: 'var(--blue)',
        price: '18',
        features: ['Access to basic models', 'Access to game details', 'Use up to 1 active model']
      },
      standard: {
        color: '#4DA1A9',
        price: '20',
        features: ['Access to all basic features', 'Access to shared models', 'Use up to 3 active models']
      },
      advanced: {
        color: '#FFBD3F',
        price: '50',
        features: ['Access to all basic and standard features', 'Unlimited active models', 'Access to advanced models']
      }
    }
    return planInfo[this.props.plan][info]
  }

  render () {
    const { plan, userPlan } = this.props
    return (
      <Card
        wrapperStyle={{ height: '368px', width: '275px', position: 'relative' }}
        styleName="membership-plan"
      >
        <div styleName="plan-container" style={{ backgroundColor: `${this.planFactory('color')}` }}>
          <p className="semibold" styleName="plan">{plan.toUpperCase()}</p>
          <div styleName="price">
            <span className="semibold" styleName="dollar">$</span>
            <span className="semibold" styleName="amount">{this.planFactory('price')}</span>
            <span className="small" style={{ letterSpacing: '1px' }}>/mo</span>
          </div>
        </div>

        <div styleName="features">
          {
            this.planFactory('features').map(feature => (
              <div key={feature}>
                <p className="small label">{feature}</p>
              </div>
            ))
          }
        </div>

        <div styleName="button-container">
          {
            userPlan === plan ? (
              <Button disabled shouldFitContainer>Your Current Plan</Button>
            ) : (
              <Button flat shouldFitContainer>Change to This Plan</Button>
            )
          }
        </div>
      </Card>
    )
  }
}

MembershipPlan.propTypes = {
  plan: PropTypes.string.isRequired,
  userPlan: PropTypes.string.isRequired
}

export default MembershipPlan
