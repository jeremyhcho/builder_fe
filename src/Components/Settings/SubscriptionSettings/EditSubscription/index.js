import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import SubscriptionPlan from '../../Blocks/SubscriptionPlan'
import CancelSubscription from './CancelSubscription'
import { Spinner, Button } from 'Components/Common'

// Actions
import { updateSubscriptionPlan, createSubscriptionPlan } from 'Actions'

// Helpers
import { makeFilterSubscriptions } from 'Helpers/Selectors'

class EditSubscription extends React.Component {
  state = {
    openModal: false
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.deletingSubscription && this.props.deletingSubscription) {
      this.props.toggle()
    }

    if (!newProps.creatingingSubscription && this.props.creatingSubscription) {
      this.props.toggle()
    }
  }

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal })
  }

  selectPlan = (planType) => {
    const { userId, createSubscriptionPlan, updateSubscriptionPlan, subscription } = this.props

    if (!subscription) {
      createSubscriptionPlan(planType)
    } else {
      updateSubscriptionPlan(userId, planType)
    }
  }

  renderCancelSubscription () {
    const { subscription, deletingSubscription } = this.props

    if (!subscription) {
      return null
    }

    return (
      <div style={{ textAlign: 'center', marginTop: '25px' }}>
        {
          deletingSubscription ? (
            <Spinner show xs />
          ) : (
            <Button
              danger={subscription ? true : subscription}
              disabled={!subscription}
              onClick={this.toggleModal}
            >
              Cancel subscription
            </Button>
          )
        }

        <CancelSubscription
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
        />
      </div>
    )
  }

  render () {
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
              plan="single-plan"
              select={this.selectPlan}
            />
          </Col>

          <Col>
            <SubscriptionPlan
              plan="multi-plan"
              select={this.selectPlan}
            />
          </Col>
        </Row>

        {this.renderCancelSubscription()}
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
    deletingSubscription: routines.isLoading.DELETE_SUBSCRIPTION,
    creatingSubscription: routines.isLoading.CREATE_SUBSCRIPTION
  })
}

const mapDispatchToProps = {
  updateSubscriptionPlan,
  createSubscriptionPlan
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(EditSubscription)
