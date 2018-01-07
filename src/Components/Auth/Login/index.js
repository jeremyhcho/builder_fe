import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

// Components
import LoginForm from './LoginForm'

// CSS
import './Login.scss'

class Login extends React.Component {
  state = {
    loginError: false,
  }

  componentWillReceiveProps (newProps) {
    if (newProps.loginError) {
      this.setState({ loginError: true })
    }
  }

  closeErrorDialog = () => {
    this.setState({ loginError: false })
  }

  render () {
    const errorDialog = classNames('error-dialog', {
      open: this.state.loginError
    })

    return (
      <div styleName="login">
        <div styleName="login-header">
          <h2 className="semibold">
            Get your free Quartz account now.
          </h2>
          <p className="small label" style={{ margin: '15px 0' }}>
            Try Quartz free for 7 days with access to basic models
          </p>
        </div>

        <div styleName={errorDialog}>
          <div onClick={this.closeErrorDialog}>
            <i className="fa fa-times" aria-hidden="true" />
          </div>
          <p>Incorrect email address and / or password.</p>
          <p>
            Do you need help <Link className='link' to={{ pathname: '/auth/forgot' }}>logging in?</Link>
          </p>
        </div>

        <LoginForm />

        <div styleName="login-links">
          <Link
            to={{ pathname: '/auth/forgot' }}
            className="small"
          >
            Forgot your password?
          </Link>

          <Link
            to={{ pathname: '/auth/signup' }}
            className="small"
          >
            Sign up for an account
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  loginError: auth.login.error
})

export default connect(
  mapStateToProps
)(Login)
