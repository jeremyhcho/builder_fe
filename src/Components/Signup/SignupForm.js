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
import { minChar } from '../../Helpers/Validators'

class SignupForm extends Component {
  formInput = ({ input, meta: { touched, error }, ...customProps }) => {
    return (
      <div>
        <FieldText
          {...input}
          {...customProps}
        />
        {
          touched &&
          error && <p>{error}</p>
        }
      </div>
    )
  }

  submit = (e) => {
    // Submit action that gets passed into redux-form's handleSubmit prop
    console.log(e)
  }

  render () {
    return (
      <div styleName="container">
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Field
            name="Username"
            component={this.formInput}
            label="username"
            type="text"
            isLabelHidden
            shouldFitContainer
            placeholder="Enter username"
          />
          <Field
            name="email"
            component={this.formInput}
            label="Email"
            type="email"
            isLabelHidden
            shouldFitContainer
            placeholder="Enter email"
          />
          <Field
            name="password"
            component={this.formInput}
            label="Password"
            type="password"
            isLabelHidden
            shouldFitContainer
            placeholder="Create password"
          />
          <Field
            name="confirmPassword"
            component={this.formInput}
            label="Confirm password"
            type="password"
            isLabelHidden
            shouldFitContainer
            placeholder="Confirm password"
          />
          <div style={{ margin: '15px 0' }}>
            <Button
              shouldFitContainer
              appearance="primary"
              type="submit"
            >
              Log In
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
