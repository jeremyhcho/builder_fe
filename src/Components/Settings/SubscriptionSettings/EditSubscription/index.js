import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import SubscriptionPlan from '../../Blocks/SubscriptionPlan'
import { Spinner } from 'Components/Common'

// Actions
import { deleteSubscriptionPlan, updateSubscriptionPlan, createSubscriptionPlan } from 'Actions'

class EditSubscription extends React.Component {
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
    const { deletingSubscription } = this.props

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
              <p style={{ marginTop: '15px' }}>
                Click {' '}
                <span
                  className="link"
                  onClick={this.cancelSubscription}
                >
                  here
                </span>
                {' '} to cancel your current subscription
              </p>
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
  subscription: PropTypes.object,
  userId: PropTypes.number.isRequired
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.authState.user.id,
  subscription: auth.authState.user.subscription,
  deletingSubscription: auth.authState.deletingSubscription
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
