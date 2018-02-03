import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectStripe } from 'react-stripe-elements'
import { Link } from 'react-router-dom'

// Components
import { Modal, Button } from 'Components/Common'
import PaymentDetails from './PaymentDetails'
import PaymentForm from '../Blocks/PaymentForm'

// Icons
import UpdateCardIcon from 'Assets/Icons/settings/card_update.svg'
import AlertIcon from 'Assets/Icons/settings/alert.svg'

// CSS
import './AccountSettings.scss'

// Actions
import { updateBillingInformation } from 'Actions'

class PaymentSettings extends React.Component {
  state = {
    updatingCard: false
  }

  componentWillReceiveProps (newProps) {
    // Toggle after billing information has been updated
    if (!newProps.updatingBilling && this.props.updatingBilling) {
      this.toggleUpdateCard()
    }
  }

  updateCard = ({ Name }) => {
    const { updateBillingInformation, userId } = this.props

    this.props.stripe.createToken({
      name: Name
    }).then(({ token }) => {
      if (token) updateBillingInformation(userId, token.id)
    })
  }

  toggleUpdateCard = () => {
    this.setState({ updatingCard: !this.state.updatingCard })
  }

  renderUnsubscribedUser () {
    return (
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <AlertIcon style={{ marginBottom: '10px', opacity: '0.7' }} />
        <p>You are not subscribed to any plans on your Quartz account.</p>
        <p>Click <Link to="/settings/subscription" style={{ color: 'var(--blue)' }}>here</Link> to subscribe for a payment plan.</p>
      </div>
    )
  }

  renderFooter () {
    const { updatingBilling } = this.props

    if (updatingBilling) {
      return [
        <Button disabled key="close">
          Close
        </Button>,
        <Button key="submitting" type="button" loading />
      ]
    }

    return [
      <Button
        key="close"
        type="button"
        flat
        onClick={this.toggleUpdateCard}
      >
        Close
      </Button>,
      <Button key="submit">
        Submit
      </Button>
    ]
  }

  render () {
    const { billing, userId, handleSubmit } = this.props

    return (
      <div>
        {
          !Object.keys(billing).length ? (
            this.renderUnsubscribedUser()
          ) : (
            <div>
              <PaymentDetails
                card={billing.sources.data[0]}
                toggleUpdate={this.toggleUpdateCard}
              />
              <form onSubmit={handleSubmit(this.updateCard)}>
                <Modal
                  header="Changing payment information"
                  toggle={this.toggleUpdateCard}
                  isOpen={this.state.updatingCard}
                  footer={this.renderFooter()}
                  wrapperStyle={{ width: '600px' }}
                >
                  <div>
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                      <UpdateCardIcon />
                      <p className="small label">Change existing payment method</p>
                    </div>
                    <PaymentForm userId={userId} />
                  </div>
                </Modal>
              </form>
            </div>
          )
        }
      </div>
    )
  }
}

PaymentSettings.defaultProps = {
  billing: {},
  updatingBilling: false
}

PaymentSettings.propTypes = {
  billing: PropTypes.object,
  updateBillingInformation: PropTypes.func.isRequired,
  stripe: PropTypes.object.isRequired,
  updatingBilling: PropTypes.bool,
  userId: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth, routines }) => ({
  userId: auth.authState.user.id,
  billing: routines.auth.billing,
  updatingBilling: routines.callingApi.UPDATE_BILLING,
})

const mapDispatchToProps = {
  updateBillingInformation
}

export default injectStripe(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'card'
})(PaymentSettings)))
