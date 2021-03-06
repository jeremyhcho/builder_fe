import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm, reset, initialize } from 'redux-form'
import randomstring from 'randomstring'

// CSS
import './Login.scss'

// Components
import { Button, Checkbox, FieldInput } from 'Components/Common'

// Auth
import { loginUser } from 'Actions'

// Validators
import { presence, minChar, email } from 'Helpers/Validators'

const minChar8 = minChar(8)

class LoginForm extends Component {
  state = {
    rememberMe: false
  }

  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe })
  }

  handleSubmit = ({ Email, Password }) => {
    const { rememberMe } = this.state

    this.props.loginUser({
      user: {
        email: Email,
        password: Password
      },
      remember_me: rememberMe ? randomstring.generate() : null
    })

    // initializes reset value of Password to '' and keeps forms pristine
    this.props.dispatch(initialize('login', { Email, Password: '', }, false))
    this.props.dispatch(reset('login'))
  }

  render () {
    return (
      <div styleName='login-container'>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field
            name='Email'
            type='text'
            label="Email"
            isLabelHidden
            component={FieldInput}
            shouldFitContainer
            autoComplete="off"
            spellCheck={false}
            placeholder='example@address.com'
            validate={[presence, email]}
          />

          <Field
            name='Password'
            type='password'
            label="Password"
            isLabelHidden
            component={FieldInput}
            shouldFitContainer
            autoComplete="off"
            spellCheck={false}
            placeholder="Password"
            validate={[presence, minChar8]}
          />

          <Checkbox
            value='rememberMe'
            onChange={this.toggleRememberMe}
            checked={this.state.rememberMe}
            style={{ margin: '15px 0' }}
          >
            Remember me
          </Checkbox>

          <Button
            shouldFitContainer
            type="submit"
            loading={this.props.isLoggingIn}
          >
            Log in
          </Button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  isLoggingIn: auth.login.loggingIn,
})

const mapDispatchToProps = {
  loginUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'login'
})(LoginForm))
