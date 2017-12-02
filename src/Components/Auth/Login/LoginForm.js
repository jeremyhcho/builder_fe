import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// CSS
import './Login.scss'

// Components
import {
  Button,
  FieldText,
  Spinner,
  Checkbox
} from 'Components/Common'

// Auth
import { loginUser } from 'Actions'

// Redux-form
// import { Field, reduxForm } from 'redux-form'

class LoginForm extends Component {
  state = {
    isEmailValidated: false,
    email: '',
    password: '',
    rememberMe: false
  }

  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe })
  }

  handleClick = () => {
    const {
      isEmailValidated,
      email,
      password,
      rememberMe
    } = this.state

    if (isEmailValidated) {
      this.props.loginUser({
        user: {
          email,
          password
        },
        rememberMe
      })
    }

    this.setState({ isEmailValidated: true })
  }

  handleChange = (field) => {
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  renderError () {
    return (
      <div styleName='error-dialog'>
        <p>Incorrect email address and / or password.</p>
        <p>
          Do you need help <Link className='link' to={{ pathname: '/auth/forgot' }}>logging in?</Link>
        </p>
      </div>
    )
  }

  renderPasswordField () {
    const passwordStyles = {
      height: this.state.isEmailValidated ? '40px' : '0',
      transition: 'height 300ms',
      transitionDelay: 'height 1s',
      overflow: 'hidden',
      margin: this.state.isEmailValidated ? '15px 0' : '0'
    }

    return (
      <FieldText
        name='password'
        label='password'
        type='password'
        isLabelHidden
        shouldFitContainer
        placeholder='Enter password'
        autoComplete='off'
        style={passwordStyles}
        value={this.state.password}
        onChange={this.handleChange('password')}
      />
    )
  }

  renderInnerButton () {
    if (this.props.isLoggingIn) {
      return <Spinner invertColor size='small' style={{ paddingTop: '8px' }} />
    }

    return this.state.isEmailValidated ? 'Log in' : 'Continue'
  }

  render () {
    return (
      <div styleName='login-container'>
        <Button
          style={{ textAlign: 'center', margin: 0 }}
          shouldFitContainer
          iconBefore={
            <i
              className='fa fa-google'
              style={{ display: 'block', fontSize: '14px' }}
            />
          }
        >
          Log in with Google
        </Button>

        <p
          style={{
            textAlign: 'center',
            color: '#97A0AF',
            fontSize: '11px',
            marginTop: '20px'
          }}
        >
          OR
        </p>

        {this.props.loginError && this.renderError()}

        <FieldText
          name='email'
          label='email'
          type='text'
          isLabelHidden
          shouldFitContainer
          placeholder='Enter email'
          autoComplete='off'
          value={this.state.email}
          onChange={this.handleChange('email')}
        />

        {this.renderPasswordField()}

        <Checkbox
          label='Remember me'
          name='rememberme'
          value='rememberMe'
          onChange={this.toggleRememberMe}
        />

        <Button shouldFitContainer appearance='primary' onClick={this.handleClick}>
          {this.renderInnerButton()}
        </Button>
      </div>
    )
  }
}

LoginForm.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired
}

const mapStateToProps = ({ auth }) => ({
  isLoggingIn: auth.login.loggingIn,
  loginError: auth.login.error
})

const mapDispatchToProps = {
  loginUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
