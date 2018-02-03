import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
    return (
      <div styleName="login">
        <div styleName="login-header">
          <h1 className="semibold">
            Log in to your Quartz <br />account
          </h1>
        </div>

        {
          this.state.loginError &&
          <div styleName="error-dialog">
            <p>Incorrect email address and / or password.</p>
            <p>
              Do you need help <Link className='link' to={{ pathname: '/auth/forgot' }}>logging in?</Link>
            </p>
          </div>
        }

        <LoginForm />

        <div styleName="login-links">
          <p>
            <Link
              to={{ pathname: '/auth/forgot' }}
              className="small"
            >
              Forgot your password?
            </Link>
          </p>

          <p style={{ marginTop: '15px' }}>
            <Link
              to={{ pathname: '/auth/signup' }}
              className="small"
            >
              Sign up for an account
            </Link>
          </p>
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
