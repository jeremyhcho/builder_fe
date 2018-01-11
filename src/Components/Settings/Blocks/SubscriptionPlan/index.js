import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Card, Button } from 'Components/Common'

// CSS
import './SubscriptionPlan.scss'

class SubscriptionPlan extends React.Component {
  selectPlan = () => {
    this.props.select(this.props.plan)
  }

  renderButton () {
    const { subscriptionPlan, plan } = this.props

    if (subscriptionPlan === plan) {
      return (
        <p style={{ marginTop: '34px' }} className="semibold">You are currently on this plan</p>
      )
    }

    return (
      <Button
        style={{ marginTop: '15px' }}
        onClick={this.selectPlan}
        type="button"
      >
        Choose this plan
      </Button>
    )
  }

  render () {
    const { plan } = this.props
    const planFactory = {
      'basic-plan': {
        price: 25,
        features: ['Access to basic models', 'Access to game details', 'Use up to 3 active models']
      },
      'advanced-plan': {
        price: 50,
        features: ['Access to all basic features', 'Unlimited active models', 'Access to advanced models']
      }
    }

    return (
      <Card
        style={{ margin: '0 25px' }}
        wrapperStyle={{ height: '375px', width: '275px', position: 'relative', paddingTop: '80px' }}
        styleName="subscription-plan"
      >
        <div>
          <p className="semibold">{plan.toUpperCase()}</p>
        </div>

        <div styleName="price">
          <span className="semibold" styleName="dollar">$</span>
          <span className="semibold" styleName="amount">{planFactory[plan].price}</span>
          <span className="small" style={{ letterSpacing: '0.5px' }}>/mo</span>
        </div>

        <div styleName="features">
          {
            planFactory[plan].features.map(feature => (
              <p key={feature} className="small label">{feature}</p>
            ))
          }
        </div>

        <hr />

        {this.renderButton()}
      </Card>
    )
  }
}

SubscriptionPlan.defaultProps = {
  select: () => null,
  subscriptionPlan: ''
}

SubscriptionPlan.propTypes = {
  plan: PropTypes.oneOf(['basic-plan', 'advanced-plan']).isRequired,
  select: PropTypes.func,
  subscriptionPlan: PropTypes.string
}

const mapStateToProps = ({ auth }) => ({
  subscriptionPlan: auth.authState.user.subscription_plan
})

export default connect(
  mapStateToProps
)(SubscriptionPlan)
