import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import SubscriptionPlan from '../Blocks/SubscriptionPlan'

// CSS
import './SubscriptionSettings.scss'

// Actions
import { updateSubscriptionPlan } from 'Actions'

class Subscription extends React.Component {
  selectPlan = (planType) => {
    const { userId, updateSubscriptionPlan } = this.props
    updateSubscriptionPlan(userId, planType)
  }

  render () {
    return (
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
    )
  }
}

Subscription.propTypes = {
  updateSubscriptionPlan: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.authState.user.id
})

const mapDispatchToProps = {
  updateSubscriptionPlan
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscription)
