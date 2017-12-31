import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import {
  FieldInput,
  FieldSelect,
  Button,
  Card
} from 'Components/Common'

// CSS
import './Billing.scss'

// Helpers & Validators
import { minWord, presence, minChar, zipCode } from 'Helpers/Validators'
import { states } from 'Helpers'

const minChar1 = minChar(1)
const minChar3 = minChar(3)
const minWord2 = minWord(2)

const options = Object.keys(states).map(state => ({
  label: `${states[state]} ${state}`, value: states[state]
}))

const fakeOptions = [
  { label: 'Market Value', value: 'market' },
  { label: 'Route', value: 'route' },
  { label: 'Lorem ipsum dolor sit amet consectetur adipiscing sit amet', value: 'lorem' }
]

class BillingInformation extends React.Component {
  submitBillingInfo = (form) => {
    console.log(form)
  }

  render () {
    return (
      <form onSubmit={this.props.handleSubmit(this.submitBillingInfo)}>
        <Row>
          <Col xs={6}>
            <Card label="1. Billing Address" wrapperStyle={{ padding: '25px 45px 45px' }}>
              <Field
                name="Full Name"
                component={FieldInput}
                label="Full name"
                type="text"
                shouldFitContainer
                autoComplete="off"
                placeholder="Enter full name"
                validate={[presence, minWord2]}
              />

              <Field
                name="Address"
                component={FieldInput}
                label="Address 1"
                type="text"
                shouldFitContainer
                autoComplete="off"
                placeholder="Enter Address"
                validate={[presence]}
              />

              <Field
                name="Address2"
                component={FieldInput}
                label="Address 2"
                type="text"
                shouldFitContainer
                autoComplete="off"
                placeholder="Enter Address (optional)"
              />

              <Field
                name="City"
                component={FieldInput}
                type="text"
                label="City"
                shouldFitContainer
                autoComplete="off"
                placeholder="Enter City name"
                validate={[presence]}
              />

              <Row>
                <Col xs={6}>
                  <Field
                    name="State"
                    component={FieldSelect}
                    options={options}
                    defaultText="State"
                    validate={[presence, minChar1]}
                    style={{ marginTop: '37px' }}
                  />
                </Col>

                <Col xs={6}>
                  <Field
                    name="Zip Code"
                    label="Zip Code"
                    component={FieldInput}
                    type="text"
                    shouldFitContainer
                    autoComplete="off"
                    validate={[presence, zipCode]}
                    sm
                  />
                </Col>
              </Row>

              <Button
                shouldFitContainer
                type="submit"
                style={{ margin: '15px 0 0' }}
              >
                Submit
              </Button>
            </Card>
          </Col>

          <Col xs={6}>
            <Card wrapperStyle={{ padding: '25px 45px 45px' }} label="2. Credit Card Info">
              <Field
                name="Name"
                label="Name on card"
                component={FieldInput}
                type="text"
                shouldFitContainer
                placeholder="James Bond"
                autoComplete="off"
                validate={[presence, minWord2]}
              />

              <Field
                name="Card Number"
                label="Card Number"
                component={FieldInput}
                type="text"
                shouldFitContainer
                placeholder="0000-0000-0000-0000"
                autoComplete="off"
                validate={[presence]}
              />

              <Row>
                <Col xs={4}>
                  <Field
                    name="CVV Number"
                    label="CVV Number"
                    component={FieldInput}
                    type="text"
                    shouldFitContainer
                    placeholder="CVV"
                    autoComplete="off"
                    validate={[presence, minChar3]}
                    sm
                  />
                </Col>
                <Col xs={4}>
                  <Field
                    name="Expiration Month"
                    label="Exp. Month"
                    component={FieldSelect}
                    defaultText="Month"
                    options={fakeOptions}
                  />
                </Col>
                <Col xs={4}>
                  <Field
                    name="Expiration Year"
                    label="Exp. Year"
                    component={FieldSelect}
                    defaultText="Year"
                    options={fakeOptions}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </form>
    )
  }
}

BillingInformation.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'billing'
})(BillingInformation)
