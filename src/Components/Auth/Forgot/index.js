import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import ForgotForm from './ForgotForm'
import { Link } from 'react-router-dom'

// Icons
import CheckIcon from 'Assets/Icons/auth/check-2.svg'

// CSS
import './Forgot.scss'

const iconStyle = {
  width: '40px',
  height: '40px',
  textAlign: 'center'
}

const Forgot = ({ emailSentSuccess }) => (
  <div styleName="forgot">
    <div styleName="forgot-header">
      {emailSentSuccess && <CheckIcon style={iconStyle} />}
      <h2 className="semibold" style={{ marginBottom: '25px' }}>
        {
          emailSentSuccess ? (
            'Email recovery link sent!'
          ) : (
            'Forgot your password?'
          )
        }
      </h2>
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
