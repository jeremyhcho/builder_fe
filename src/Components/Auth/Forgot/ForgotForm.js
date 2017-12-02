import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Components
import {
  FieldText,
  Button,
  Spinner
} from 'Components/Common'

// CSS
import './Forgot.scss'

// Actions
import { sendRecoveryEmail } from 'Actions'

class ForgotForm extends React.Component {
  state = {
    email: ''
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value })
  }

  handleClick = () => {
    this.props.sendRecoveryEmail(this.state.email)
  }

  renderInnerButton () {
    if (this.props.sendingEmail) {
      return <Spinner invertColor size='small' style={{ paddingTop: '8px' }} />
    }

    return 'Send recovery link'
  }

  renderEmailSentMessage () {
    return (
      <div styleName='email-sent'>
        <p>
          We've sent an email to <span className='blue'>{this.state.email}</span>
          with instructions to recover your password.
        </p>
        <p style={{ marginTop: '40px' }}>
          Didn't receive the e-mail?&nbsp;
          <Link className='link' to={{ pathname: '/auth/forgot' }}>Try again.</Link>
        </p>
      </div>
    )
  }

  render () {
    if (this.props.emailSentSuccess) {
      return this.renderEmailSentMessage()
    }

    return (
      <div styleName='forgot-container'>
        <FieldText
          name='email'
          label="We'll send a recovery link to"
          type='email'
          shouldFitContainer
          placeholder='Enter email'
          autoComplete='off'
          style={{ margin: 0 }}
          onChange={this.handleChange}
        />

        <Button shouldFitContainer appearance='primary' onClick={this.handleClick}>
          {this.renderInnerButton()}
        </Button>
      </div>
    )
  }
}

ForgotForm.propTypes = {
  sendingEmail: PropTypes.bool.isRequired,
  sendRecoveryEmail: PropTypes.func.isRequired,
  emailSentSuccess: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  sendingEmail: auth.forgot.sendingEmail,
  emailSentSuccess: auth.forgot.success
})

const mapDispatchToProps = {
  sendRecoveryEmail
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotForm)
