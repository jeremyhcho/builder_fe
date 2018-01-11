import React from 'react'
import { Link } from 'react-router-dom'

// Components
import SignupForm from './SignupForm'

// CSS
import './Signup.scss'

class Signup extends React.Component {
  render () {
    return (
      <div styleName="signup">
        <div styleName="signup-header">
          <h1 className="semibold">
            Get your free Quartz account now.
          </h1>
          <p className="small label" style={{ margin: '15px 0' }}>
            Try Quartz free for 7 days with access to basic models
          </p>
        </div>

        <SignupForm />

        <p styleName="login-link" className="small">
          <Link to="/auth/login">Already have an account? Log in</Link>
        </p>
      </div>
    )
  }
}

export default Signup
