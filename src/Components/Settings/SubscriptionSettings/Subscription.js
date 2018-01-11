import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import SubscriptionPlan from '../Blocks/SubscriptionPlan'

// Icons
import AlertIcon from 'Assets/Icons/settings/alert.svg'

// CSS
import './SubscriptionSettings.scss'

// Actions
import { updateSubscriptionPlan, createSubscriptionPlan } from 'Actions'

class Subscription extends React.Component {
  selectPlan = (planType) => {
    const { userId, createSubscriptionPlan, updateSubscriptionPlan, subscriptionPlan } = this.props
    if (!subscriptionPlan) {
      createSubscriptionPlan(planType)
    } else {
      updateSubscriptionPlan(userId, planType)
    }
  }

  render () {
    const { subscriptionPlan } = this.props

    return (
      <div>
        {
          !subscriptionPlan &&
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <AlertIcon style={{ marginBottom: '10px' }} />
            <p>You are not subscribed to any plans on your Quartz account.</p>
          </div>
        }

        <div styleName="plans">
          <SubscriptionPlan
            plan="basic-plan"
            select={this.selectPlan}
          />
          <SubscriptionPlan
            plan="advanced-plan"
            select={this.selectPlan}
          />
        </div>
      </div>
    )
  }
}

Subscription.defaultProps = {
  subscriptionPlan: null
}

Subscription.propTypes = {
  updateSubscriptionPlan: PropTypes.func.isRequired,
  createSubscriptionPlan: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  subscriptionPlan: PropTypes.object
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.authState.user.id,
  subscriptionPlan: auth.authState.user.subscription_id
})

const mapDispatchToProps = {
  updateSubscriptionPlan,
  createSubscriptionPlan
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscription)
