import React from 'react'
import PropTypes from 'prop-types'
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements'

// Components
import { Input, Card, Button } from 'Components/Common'
import StripeInput from './StripeInput'

// CSS
import './Billing.scss'

// Apis
import { createBillingInformation } from 'Apis'

/* eslint-disable max-len */
/* To change input wrapper styling for react-stripe-elements change .StripeElement in 'Assets/Stylesheets/Main.scss' */
/* eslint-enable max-len */

class BillingInfo extends React.Component {
  state = {
    name: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { name } = this.state

    this.props.stripe.createToken({
      name
    }).then(({ token }) => {
      console.log('Received Stripe token: ', token)
      createBillingInformation(token.id)
        .then(res => console.log(res))
    })
  }

  render () {
    return (
      <Card
        label="Card Information"
        wrapperStyle={{
          width: '500px',
          padding: '25px 45px 45px',
          textAlign: 'left'
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            placeholder="Jane Doe"
            label="Name on card"
            shouldFitContainer
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

          <Button type="submit" shouldFitContainer style={{ marginTop: '15px' }}>Submit card information</Button>
        </form>
      </Card>
    )
  }
}

BillingInfo.propTypes = {
  stripe: PropTypes.object.isRequired
}

export default injectStripe(BillingInfo)
