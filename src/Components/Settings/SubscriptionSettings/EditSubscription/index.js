import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import SubscriptionPlan from '../../Blocks/SubscriptionPlan'
import { Spinner, Button } from 'Components/Common'

// Actions
import { deleteSubscriptionPlan, updateSubscriptionPlan, createSubscriptionPlan } from 'Actions'

// Helpers
import { makeFilterSubscriptions } from 'Helpers/Selectors'

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

        <Row center='xs'>
          <Col>
            <SubscriptionPlan
              plan="basic-plan"
              select={this.selectPlan}
            />
          </Col>

          <Col>
            <SubscriptionPlan
              plan="advanced-plan"
              select={this.selectPlan}
            />
          </Col>
        </Row>

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
  subscription: null,
  deletingSubscription: false,
  creatingSubscription: false
}

EditSubscription.propTypes = {
  toggle: PropTypes.func.isRequired,
  deleteSubscriptionPlan: PropTypes.func.isRequired,
  updateSubscriptionPlan: PropTypes.func.isRequired,
  createSubscriptionPlan: PropTypes.func.isRequired,
  deletingSubscription: PropTypes.bool,
  creatingSubscription: PropTypes.bool,
  subscription: PropTypes.object,
  userId: PropTypes.number.isRequired
}

const makeMapStateToProps = () => {
  const getSubscription = makeFilterSubscriptions()
  return ({ routines, auth }) => ({
    userId: auth.authState.user.id,
    subscription: getSubscription(routines).subscription,
    deletingSubscription: routines.callingApi.DELETE_SUBSCRIPTION,
    creatingSubscription: routines.callingApi.CREATE_SUBSCRIPTION
  })
}

const mapDispatchToProps = {
  deleteSubscriptionPlan,
  updateSubscriptionPlan,
  createSubscriptionPlan
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(EditSubscription)
