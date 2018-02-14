import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Modal, Button } from 'Components/Common'

// Icons
import ErrorIcon from 'Assets/Icons/error.svg'

// Actions
import { deleteSubscriptionPlan } from 'Actions'

class CancelSubscription extends React.Component {
  componentWillReceiveProps (newProps) {
    if (!newProps.deletingSubscription && this.props.deletingSubscription) {
      this.props.toggle()
    }
  }

  cancelSubscription = () => {
    const { deleteSubscriptionPlan, userId } = this.props
    deleteSubscriptionPlan(userId)
  }

  renderFooter () {
    if (this.props.deletingSubscription) {
      return [
        <Button flat key='cancel' shouldFitContainer>
          Cancel
        </Button>,
        <Button danger shouldFitContainer key='delete' loading />
      ]
    }

    return [
      <Button
        flat
        key='back'
        onClick={this.props.toggle}
        shouldFitContainer
      >
        Back
      </Button>,
      <Button
        danger
        key='cancelSubscription'
        onClick={this.cancelSubscription}
        shouldFitContainer
      >
        Cancel Subscription
      </Button>
    ]
  }

  render () {
    const { isOpen, toggle } = this.props
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        headerIcon={ErrorIcon}
        header="Cancel subscription"
        footer={this.renderFooter()}
        wrapperStyle={{ width: '500px' }}
      >
        <div style={{ padding: '25px 25px 10px', lineHeight: '25px' }}>
          <p>
            Are you sure you want to cancel your subscription?
          </p>
        </div>
      </Modal>
    )
  }
}

CancelSubscription.defaultProps = {
  deletingSubscription: false
}

CancelSubscription.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  deleteSubscriptionPlan: PropTypes.func.isRequired,
  deletingSubscription: PropTypes.bool,
  userId: PropTypes.number.isRequired
}

const mapStateToProps = ({ auth, routines }) => ({
  userId: auth.authState.user.id,
  deletingSubscription: routines.callingApi.DELETE_SUBSCRIPTION,
})

const mapDispatchToProps = {
  deleteSubscriptionPlan
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelSubscription)
