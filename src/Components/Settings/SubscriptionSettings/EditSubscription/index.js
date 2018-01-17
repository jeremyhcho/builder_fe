import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import SubscriptionPlan from '../../Blocks/SubscriptionPlan'
import { Spinner, Button } from 'Components/Common'

// Actions
import { deleteSubscriptionPlan, updateSubscriptionPlan, createSubscriptionPlan } from 'Actions'

class EditSubscription extends React.Component {
  componentWillReceiveProps (newProps) {
    if (!newProps.deletingSubscription && this.props.deletingSubscription) {
      this.props.toggle()
    }

    if (!newProps.creatingingSubscription && this.props.creatingSubscription) {
      this.props.toggle()
    }
  }

  cancelSubscription = () => {
    this.props.deleteSubscriptionPlan(this.props.userId)
  }

  selectPlan = (planType) => {
    const { userId, createSubscriptionPlan, updateSubscriptionPlan, subscription } = this.props

    if (!subscription) {
      createSubscriptionPlan(planType)
    } else {
      updateSubscriptionPlan(userId, planType)
    }
  }

  render () {
    const { deletingSubscription, subscription } = this.props

    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <p onClick={this.props.toggle} className="link">
            Go back to your subscriptions
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SubscriptionPlan
            plan="basic-plan"
            select={this.selectPlan}
          />
          <SubscriptionPlan
            plan="advanced-plan"
            select={this.selectPlan}
          />
        </div>

        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          {
            deletingSubscription ? (
              <Spinner show xs />
            ) : (
              <Button
                flat={subscription ? true : subscription}
                disabled={!subscription}
                onClick={this.cancelSubscription}
              >
                Cancel current subscription
              </Button>
            )
          }
        </div>
      </div>
    )
  }
}

EditSubscription.defaultProps = {
  subscription: null
}

EditSubscription.propTypes = {
  toggle: PropTypes.func.isRequired,
  deleteSubscriptionPlan: PropTypes.func.isRequired,
  updateSubscriptionPlan: PropTypes.func.isRequired,
  createSubscriptionPlan: PropTypes.func.isRequired,
  deletingSubscription: PropTypes.bool.isRequired,
  creatingSubscription: PropTypes.bool.isRequired,
  subscription: PropTypes.object,
  userId: PropTypes.number.isRequired
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.authState.user.id,
  subscription: auth.authState.user.subscription,
  deletingSubscription: auth.authState.deletingSubscription,
  creatingSubscription: auth.authState.creatingSubscription
})

const mapDispatchToProps = {
  deleteSubscriptionPlan,
  updateSubscriptionPlan,
  createSubscriptionPlan
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubscription)
