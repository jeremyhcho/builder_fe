import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

// CSS
import './Signup.scss'

// Components
import { Button, FieldInput, Spinner } from 'Components/Common'

// Redux-form & validators
import { presence, minChar, email, equality } from 'Helpers/Validators'

const minChar8 = minChar(8)
const equalityPassword = equality('Password')

// Actions
import { createUser } from 'Actions'

class SignupForm extends Component {
  submit = ({ Email, Password }) => {
    this.props.createUser({
      email: Email,
      password: Password
    })
  }

  renderInnerButton () {
    if (this.props.creatingUser) {
      return <Spinner xs show style={{ marginBottom: '2px' }} color="#FFF" />
    }

    return 'Create account'
  }

  renderError () {
    return (
      <div styleName='error-dialog'>
        <p>{this.props.signUpError}</p>
        <p>Need help&nbsp;
          <Link className='link' to={{ pathname: '/auth/forgot' }}>logging in?</Link>
        </p>
      </div>
    )
  }

  render () {
    return (
      <div styleName="signup-container">
        {this.props.signUpError && this.renderError()}
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Field
            name="Email"
            component={FieldInput}
            label="Email"
            isLabelHidden
            type="email"
            shouldFitContainer
            autoComplete='off'
            placeholder="example@address.com"
            validate={[presence, email]}
          />
          <Field
            name="Password"
            component={FieldInput}
            label="Password"
            isLabelHidden
            type="password"
            shouldFitContainer
            autoComplete='off'
            placeholder="Password (must be 8 characters)"
            validate={[presence, minChar8]}
          />
          <Field
            name="Password confirmation"
            component={FieldInput}
            label="Password Confirmation"
            isLabelHidden
            type="password"
            shouldFitContainer
            autoComplete='off'
            placeholder="Retype password"
            validate={[presence, equalityPassword]}
          />
          <div>
            <Button
              shouldFitContainer
              type="submit"
              style={{ margin: '15px 0 0' }}
            >
              {this.renderInnerButton()}
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  creatingUser: PropTypes.bool.isRequired,
  signUpError: PropTypes.string.isRequired
}

const mapStateToProps = ({ auth }) => ({
  creatingUser: auth.signup.creatingUser,
  signUpError: auth.signup.error
})

const mapDispatchToProps = {
  createUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'signup'
})(SignupForm))
