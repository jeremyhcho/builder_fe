import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { formValueSelector } from 'redux-form'

// Components
import { Modal, Button, Spinner } from 'Components/Common'
import PaymentForm from '../../Blocks/PaymentForm'

const selector = formValueSelector('billing')

class CreatePayment extends React.Component {
  renderFooter () {
    if (this.props.creatingBilling) {
      return [
        <Button key="close" disabled>Close</Button>,
        <Button key="submitting" type="button">
          <Spinner color="#fff" xs show style={{ margin: '0 5px 2px 0' }} /> Creating subscription
        </Button>
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
  plan: PropTypes.string
}

const mapStateToProps = ({ ...state, auth }) => ({
  userId: auth.authState.user.id,
  creatingBilling: auth.authState.creatingBilling,
  plan: selector(state, 'plan')
})

export default connect(
  mapStateToProps
)(CreatePayment)
