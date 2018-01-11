import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import ForgotForm from './ForgotForm'
import { Link } from 'react-router-dom'

// Icons
import PaperPlane from 'Assets/Icons/auth/paper-plane.svg'

// CSS
import './Forgot.scss'

const iconStyle = {
  textAlign: 'center'
}

const Forgot = ({ emailSentSuccess }) => (
  <div styleName="forgot">
    <div styleName="forgot-header">
      {emailSentSuccess && <PaperPlane style={iconStyle} width={64} height={64} />}
      {
        emailSentSuccess ? (
          <h2 className="semibold" style={{ margin: '25px' }}>
            Email recovery link sent!
          </h2>
        ) : (
          <h2 className="semibold" style={{ marginBottom: '15px', textAlign: 'left' }}>
            Forgot your password?
          </h2>
        )
      }
      {
        emailSentSuccess ? (
          ''
        ) : (
          <p className='small label' style={{ textAlign: 'left', marginBottom: '30px' }}>
            Don't worry, we'll send you instructions on how to <br />recover your account
          </p>
        )
      }
    </div>

    <ForgotForm />

    <p styleName="login-link" className="small">
      <Link to={{ pathname: '/auth/login' }}>Return to log in</Link>
    </p>
  </div>
)

Forgot.propTypes = {
  emailSentSuccess: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  emailSentSuccess: auth.forgot.success
})

export default connect(
  mapStateToProps
)(Forgot)
