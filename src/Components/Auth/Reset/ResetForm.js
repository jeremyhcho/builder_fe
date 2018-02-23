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

const minChar8 = minChar(8)
const equalityPassword = equality('Password')

// Actions
import { updateUserPassword, openSnackbar } from 'Actions'

class ResetForm extends React.Component {
  componentWillReceiveProps (newProps) {
    if (!newProps.updatingUser && this.props.updatingUser) {
      this.props.openSnackbar('Password changed', 3000)
    }
  }

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
            isLabelHidden
            component={FieldInput}
            shouldFitContainer
            placeholder="New password (must be 8 characters)"
            autoComplete='off'
            validate={[presence, minChar8]}
          />

          <Field
            name="Password confirmation"
            label="Password Confirmation"
            type="password"
            isLabelHidden
            component={FieldInput}
            shouldFitContainer
            placeholder="Confirm password"
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
  userId: PropTypes.string.isRequired,
  updatingUser: PropTypes.bool.isRequired,
  openSnackbar: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  updatingUser: auth.reset.updatingUser
})

const mapDispatchToProps = {
  updateUserPassword,
  openSnackbar
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'reset'
})(ResetForm))
