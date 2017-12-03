import React, { Component } from 'react'
import PropTypes from 'prop-types'

// CSS
import './Signup.scss'

// Components
import {
  Button,
  FieldText
} from 'Components/Common'

// Redux-form & validators
import { Field, reduxForm } from 'redux-form'
import { presence, minChar, email, equality } from 'Helpers/Validators'

const minChar5 = minChar(5)
const equalityPassword = equality('Password')

class SignupForm extends Component {
  submit = (e) => {
    console.log(e)
  }

  render () {
    return (
      <div styleName="signup-container">
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Field
            name="Username"
            component={FieldText}
            label="username"
            type="text"
            isLabelHidden
            shouldFitContainer
            autoComplete='off'
            placeholder="Enter username"
            validate={[presence, minChar5]}
          />
          <Field
            name="Email"
            component={FieldText}
            label="Email"
            type="email"
            isLabelHidden
            shouldFitContainer
            autoComplete='off'
            placeholder="Enter email"
            validate={[presence, email]}
          />
          <Field
            name="Password"
            component={FieldText}
            label="Password"
            type="password"
            isLabelHidden
            shouldFitContainer
            autoComplete='off'
            placeholder="Create password"
            validate={[presence, minChar5]}
          />
          <Field
            name="Password confirmation"
            component={FieldText}
            label="Confirm password"
            type="password"
            isLabelHidden
            shouldFitContainer
            autoComplete='off'
            placeholder="Confirm password"
            validate={[presence, equalityPassword]}
          />
          <div>
            <Button
              shouldFitContainer
              appearance="primary"
              type="submit"
            >
              Create account
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'signup'
})(SignupForm)
