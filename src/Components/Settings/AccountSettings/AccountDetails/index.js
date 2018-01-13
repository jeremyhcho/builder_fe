import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'

// Components
import { Input, FieldInput, Button, Modal } from 'Components/Common'

// Validators
import { minChar, presence, equality } from 'Helpers/Validators'

const minChar8 = minChar(8)
const equalityPassword = equality('Current password')

class AccountDetails extends React.Component {
  state = {
    changePassword: false
  }

  togglePasswordChange = () => {
    this.setState({ changePassword: !this.state.changePassword })
  }

  submitPasswordChange = (form) => {
    console.log(form)
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
              name="New password"
              component={FieldInput}
              placeholder="New password (Must be 8 characters)"
              shouldFitContainer
              validate={[presence, minChar8]}
            />

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
              name="Password confirmation"
              component={FieldInput}
              shouldFitContainer
              placeholder="Retype current password"
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
        <Input disabled placeholder={email} label="Email" />

        <p
          onClick={this.togglePasswordChange}
          className="link"
          style={{ margin: '20px 0' }}
        >
          Change password
        </p>
        {this.renderPasswordChange()}
      </div>
    )
  }
}

AccountDetails.propTypes = {
  email: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  email: auth.authState.user.email
})

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'changePassword'
})(AccountDetails))
