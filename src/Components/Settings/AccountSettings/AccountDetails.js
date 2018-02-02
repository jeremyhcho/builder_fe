import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Input, FieldInput, Button, Modal } from 'Components/Common'

// Action
import { changePassword } from 'Actions'

// Validators
import { minChar, presence, equality } from 'Helpers/Validators'

// CSS
import './AccountSettings.scss'

const minChar8 = minChar(8)
const equalityPassword = equality('New password')

class AccountDetails extends React.Component {
  state = {
    changePassword: false
  }

  togglePasswordChange = () => {
    this.setState({ changePassword: !this.state.changePassword })
  }

  submitPasswordChange = (form) => {
    const formFields = Object.keys(form)
    const newPassword = form[formFields[1]]
    const currentPassword = form[formFields[0]]

    this.props.changePassword({
      currentPassword,
      newPassword
    })
  }

  renderPasswordChange () {
    const { changePassword } = this.state

    const footerButtons = [
      <Button flat type="button" key="close" onClick={this.togglePasswordChange}>Close</Button>,
      <Button key="submit">Change Password</Button>
    ]
    return (
      <form onSubmit={this.props.handleSubmit(this.submitPasswordChange)}>
        <Modal
          header="Change password"
          toggle={this.togglePasswordChange}
          isOpen={changePassword}
          footer={footerButtons}
          wrapperStyle={{ width: '600px' }}
        >
          <div style={{ padding: '25px 50px' }}>
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

  render () {
    const { email } = this.props

    return (
      <div>
        <Row middle='xs' styleName="row">
          <div styleName="col">
            <p>Email:</p>
          </div>

          <div>
            <Input disabled placeholder={email} />
          </div>
        </Row>

        <Row middle='xs' styleName="row">
          <div styleName="col">
            <p>Password:</p>
          </div>

          <div>
            <p
              onClick={this.togglePasswordChange}
              className="link"
            >
              Change password
            </p>
          </div>
        </Row>

        {this.renderPasswordChange()}
      </div>
    )
  }
}

AccountDetails.propTypes = {
  email: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  email: auth.authState.user.email
})

const mapDispatchToProps = {
  changePassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'changePassword'
})(AccountDetails))
