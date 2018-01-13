import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectStripe } from 'react-stripe-elements'
import { reduxForm } from 'redux-form'

// Components
import CreatePlan from './CreatePlan'
import CreatePayment from './CreatePayment'

// Actions
import { createBillingInformation } from 'Actions'

class CreateSubscription extends React.Component {
  state = {
    planSelected: false
  }

  togglePlanSelected = () => {
    this.setState({ planSelected: !this.state.planSelected })
  }

  selectPlan = (planType) => {
    this.props.change('plan', planType)
    this.togglePlanSelected()
  }

  submitForm = ({ plan, Name }) => {
    this.props.stripe.createToken({
      name: Name
    }).then(({ token }) => {
      if (token) {
        this.props.createBillingInformation(token.id, plan)
      }
    })
  }

  render () {
    return (
      <div>
        <p style={{ textAlign: 'center', marginBottom: '25px' }}>
          Choose a payment plan and then fill out the payment information provided below
          to get started with our services.
        </p>
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <CreatePlan selectPlan={this.selectPlan} />
          <CreatePayment
            planSelected={this.state.planSelected}
            toggle={this.togglePlanSelected}
          />
        </form>
      </div>
    )
  }
}

CreateSubscription.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  createBillingInformation: PropTypes.func.isRequired,
  stripe: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  createBillingInformation
}

export default injectStripe(connect(
  null,
  mapDispatchToProps
)(reduxForm({
  form: 'billing',
  initialValues: { plan: '' }
})(CreateSubscription)))
