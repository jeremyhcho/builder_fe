import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { formValueSelector } from 'redux-form'

// Components
import { Modal, Button } from 'Components/Common'
import PaymentForm from '../../Blocks/PaymentForm'

const selector = formValueSelector('billing')

class CreatePayment extends React.Component {
  renderFooter () {
    if (this.props.creatingBilling && this.props.creatingSubscription) {
      return [
        <Button key="close" disabled>Close</Button>,
        <Button key="submitting" type="button" loading />
      ]
    }

    return [
      <Button
        key="close"
        type="button"
        flat
        onClick={this.props.toggle}
      >
        Close
      </Button>,
      <Button
        key="submit"
      >
        Submit
      </Button>
    ]
  }

  render () {
    return (
      <Modal
        header="Creating payment method"
        toggle={this.props.toggle}
        isOpen={this.props.planSelected}
        footer={this.renderFooter()}
        wrapperStyle={{ width: '600px' }}
      >
        <div>
          <p style={{ textAlign: 'center', margin: '25px 0' }}>Create a payment method subscribed for the {this.props.plan}</p>
          <PaymentForm userId={this.props.userId} />
        </div>
      </Modal>
    )
  }
}

CreatePayment.defaultProps = {
  plan: ''
}

CreatePayment.propTypes = {
  planSelected: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  creatingBilling: PropTypes.bool.isRequired,
  creatingSubscription: PropTypes.bool.isRequired,
  plan: PropTypes.string
}

const mapStateToProps = ({ ...state, auth }) => ({
  userId: auth.authState.user.id,
  creatingBilling: auth.authState.creatingBilling,
  creatingSubscription: auth.authState.creatingSubscription,
  plan: selector(state, 'plan')
})

export default connect(
  mapStateToProps
)(CreatePayment)
