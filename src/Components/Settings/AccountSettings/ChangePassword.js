import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

// Components
import { Button, Modal, FieldInput } from 'Components/Common'

// Actions
import { changePassword } from 'Actions'

// Helpers
import { minChar, presence, equality } from 'Helpers/Validators'

// CSS
import './AccountSettings.scss'

const minChar8 = minChar(8)
const equalityPassword = equality('New password')

class ChangePassword extends React.Component {
  componentWillReceiveProps (newProps) {
    if (!newProps.changingPassword
        && this.props.changingPassword
          && !newProps.changePasswordFailed) {
      this.props.toggle()
    }
  }

  submitPasswordChange = (form) => {
    const formFields = Object.keys(form)
    const newPassword = form[formFields[1]]
    const currentPassword = form[formFields[0]]

    this.props.changePassword({
      currentPassword,
      newPassword
    })

    this.props.reset()
  }

  render () {
    const { isOpen, toggle, handleSubmit, changePasswordFailed } = this.props

    const footer = [
      <Button flat type="button" key="close" onClick={toggle}>Cancel</Button>,
      <Button key="submit">Change Password</Button>
    ]

    return (
      <form onSubmit={handleSubmit(this.submitPasswordChange)}>
        <Modal
          header="Change password"
          toggle={toggle}
          isOpen={isOpen}
          footer={footer}
          wrapperStyle={{ width: '450px' }}
        >
          <div style={{ padding: '25px 50px' }}>
            {
              changePasswordFailed &&
              <div styleName="error-dialog">
                <p>Incorrect password or not a new password</p>
              </div>
            }

            <Field
              type="password"
              name="Current password"
              component={FieldInput}
              placeholder="Current password"
              shouldFitContainer
              validate={[presence, minChar8]}
            />

            <Field
              type="password"
              name="New password"
              component={FieldInput}
              placeholder="New password (Must be 8 characters)"
              shouldFitContainer
              validate={[presence, minChar8]}
            />

            <Field
              type="password"
              name="Password confirmation"
              component={FieldInput}
              shouldFitContainer
              placeholder="Retype new password"
              validate={[presence, minChar8, equalityPassword]}
            />
          </div>
        </Modal>
      </form>
    )
  }
}

ChangePassword.defaultProps = {
  changingPassword: false,
  changePasswordFailed: false
}

ChangePassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  changingPassword: PropTypes.bool,
  changePasswordFailed: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  changingPassword: routines.isLoading.UPDATE_PASSWORD,
  changePasswordFailed: routines.error.UPDATE_PASSWORD
})

const mapDispatchToProps = {
  changePassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'changePassword'
})(ChangePassword))
