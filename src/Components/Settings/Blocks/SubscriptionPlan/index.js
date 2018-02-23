import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Button } from 'Components/Common'

// Icons

// CSS
import './SubscriptionPlan.scss'

// Helpers
import { makeFilterSubscriptions } from 'Helpers/Selectors'
import { planFactory } from 'Helpers'

class SubscriptionPlan extends React.Component {
  selectPlan = () => {
    this.props.select(this.props.plan)
  }

  renderButton () {
    const { subscription, plan, updatingSubscription, creatingSubscription } = this.props

    if (subscription && subscription.plan.id === plan) {
      return (
        <p className="semibold">
          Subscribed
        </p>
      )
    }

    if (planFactory[plan].disabled) {
      return (
        <Button
          disabled
          shouldFitContainer
        >
          Currently unavailable
        </Button>
      )
    }

    if (updatingSubscription || creatingSubscription) {
      return (
        <Button shouldFitContainer loading />
      )
    }

    return (
      <Button
        onClick={this.selectPlan}
        type="button"
        shouldFitContainer
      >
        Choose this plan
      </Button>
    )
  }

  renderRibbon () {
    const { subscription, plan } = this.props

    if (subscription && subscription.plan.id === plan) {
      return <div styleName="ribbon"><span>SUBSCRIBED</span></div>
    }

    return null
  }

  render () {
    const { plan, active } = this.props

    return (
      <div
        styleName={active === plan ? 'subscription-plan active' : 'subscription-plan'}
      >
        {this.renderRibbon()}

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

        {this.renderButton()}
      </div>
    )
  }
}

SubscriptionPlan.defaultProps = {
  select: () => null,
  subscription: null,
  creatingSubscription: false,
  updatingSubscription: false,
  active: false
}

SubscriptionPlan.propTypes = {
  plan: PropTypes.oneOf(['basic-plan', 'advanced-plan']).isRequired,
  select: PropTypes.func,
  subscription: PropTypes.object,
  creatingSubscription: PropTypes.bool,
  updatingSubscription: PropTypes.bool,
  active: PropTypes.bool
}

const makeMapStateToProps = () => {
  const getSubscription = makeFilterSubscriptions()
  return ({ routines }) => ({
    subscription: getSubscription(routines).subscription,
    creatingSubscription: routines.isLoading.CREATE_SUBSCRIPTION,
    updatingSubscription: routines.isLoading.UPDATE_SUBSCRIPTION
  })
}

export default connect(
  makeMapStateToProps
)(SubscriptionPlan)
