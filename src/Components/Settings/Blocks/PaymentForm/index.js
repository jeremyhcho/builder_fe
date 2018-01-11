import React from 'react'
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

class PaymentForm extends React.Component {
  render () {
    return (
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
      </div>
    )
  }
}

export default PaymentForm
