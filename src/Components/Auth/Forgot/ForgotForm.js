import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Components
import { FieldInput, Button } from 'Components/Common'

// CSS
import './Forgot.scss'

// Redux-form
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { presence, email } from 'Helpers/Validators'

// Actions
import { sendRecoveryEmail } from 'Actions'

// Form Selector
const selector = formValueSelector('forgot')

class ForgotForm extends React.Component {
  handleSubmit = (form) => {
    this.props.sendRecoveryEmail(form.Email)
  }

  renderEmailSentMessage () {
    return (
      <div styleName='email-sent'>
        <p>
          We've sent an email to <span className='blue'>{this.props.email}</span>
          &nbsp;with instructions to recover your password.
        </p>
        <p style={{ marginTop: '20px' }}>
          Didn't receive the email?&nbsp;
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
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field
            name='Email'
            label="We'll send a recovery link to"
            type='email'
            isLabelHidden
            component={FieldInput}
            shouldFitContainer
            placeholder='example@address.com'
            autoComplete='off'
            style={{ margin: 0 }}
            validate={[presence, email]}
          />

          <Button
            shouldFitContainer
            type="submit"
            style={{ margin: '15px 0 0' }}
            loading={this.props.sendingEmail}
          >
            Send recovery link
          </Button>
        </form>
      </div>
    )
  }
}

ForgotForm.defaultProps = {
  email: ''
}

ForgotForm.propTypes = {
  sendingEmail: PropTypes.bool.isRequired,
  sendRecoveryEmail: PropTypes.func.isRequired,
  emailSentSuccess: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string
}

const mapStateToProps = ({ ...state, auth }) => ({
  sendingEmail: auth.forgot.sendingEmail,
  emailSentSuccess: auth.forgot.success,
  email: selector(state, 'Email')
})

const mapDispatchToProps = {
  sendRecoveryEmail
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'forgot'
})(ForgotForm))
