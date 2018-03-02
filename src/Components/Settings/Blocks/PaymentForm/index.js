import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements'
import { Field } from 'redux-form'

// Components
import { FieldInput } from 'Components/Common'
import StripeInput from './StripeInput'

// Validators
import { presence } from 'Helpers/Validators'

const errorStyle = {
  color: '#FE4A49',
  fontSize: '0.9em',
  margin: '5px 0 0 5px'
}

const PaymentForm = ({ cardError }) => (
  <div style={{ margin: '25px' }}>
    <Field
      type="text"
      component={FieldInput}
      name="Name"
      label="Name on card"
      placeholder="Jane Doe"
      shouldFitContainer
      validate={[presence]}
    />

    <StripeInput
      label="Card number"
      component={CardNumberElement}
    />

    <div className="flex">
      <div style={{ width: '40%' }}>
        <StripeInput
          label="Expiration date"
          component={CardExpiryElement}
        />
      </div>

      <div style={{ width: '25%', paddingLeft: '15px' }}>
        <StripeInput
          label="CVC"
          component={CardCVCElement}
        />
      </div>

      <div style={{ width: '35%', paddingLeft: '15px' }}>
        <StripeInput
          label="Zip Code"
          component={PostalCodeElement}
        />
      </div>
    </div>

    {
      cardError &&
      <p style={errorStyle}>{cardError.error.message}</p>
    }
  </div>
)

PaymentForm.defaultProps = {
  cardError: null
}

PaymentForm.propTypes = {
  cardError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
}

const mapStateToProps = ({ routines }) => ({
  cardError: routines.error.billing
})

export default connect(
  mapStateToProps
)(PaymentForm)
