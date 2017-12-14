import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

// CSS
import './Reset.scss'

// Component
import { FieldInput, Button } from 'Components/Common'

// Validators
import { presence, minChar, equality } from 'Helpers/Validators'

const minChar6 = minChar(6)
const equalityPassword = equality('Password')

// Actions
import { updateUserPassword } from 'Actions'

class ResetForm extends React.Component {
  onSubmit = ({ Password }) => {
    const { userId, token } = this.props

    this.props.updateUserPassword(userId, {
      user: { password: Password },
      token
    })
  }

  render () {
    return (
      <div styleName='reset-container'>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="Password"
            label="Password"
            type="password"
            component={FieldInput}
            isLabelHidden
            shouldFitContainer
            placeholder="Enter new password"
            autoComplete='off'
            validate={[presence, minChar6]}
          />

          <Field
            name="Password confirmation"
            label="Password Confirmation"
            type="password"
            component={FieldInput}
            isLabelHidden
            shouldFitContainer
            placeholder="Retype password"
            autoComplete='off'
            validate={[presence, equalityPassword]}
          />

          <Button shouldFitContainer type="submit" style={{ margin: '15px 0 0' }}>
            Update password
          </Button>
        </form>
      </div>
    )
  }
}

ResetForm.propTypes = {
  updateUserPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  updateUserPassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'reset'
})(ResetForm))
