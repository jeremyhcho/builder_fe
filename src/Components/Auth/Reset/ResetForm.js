import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// CSS
import './Reset.scss'

// Component
import {
  FieldText,
  Button
} from 'Components/Common'

// Actions
import { updateUserPassword } from 'Actions'

class ResetForm extends React.Component {
  state = {
    password: '',
    passwordConfirmation: ''
  }

  onSubmit = () => {
    const { userId, password, token } = this.state

    this.props.updateUserPassword(userId, {
      user: { password },
      token
    })
  }

  handleChange = (field) => {
    return (e) => this.setState({ [field]: e.target.value })
  }

  render () {
    return (
      <div styleName='reset-container'>
        <FieldText
          name="Password"
          label="Password"
          type="password"
          isLabelHidden
          shouldFitContainer
          placeholder="Enter new password"
          autoComplete='off'
          value={this.state.password}
          onChange={this.handleChange('password')}
        />

        <FieldText
          name="Password Confirmation"
          label="Password Confirmation"
          type="password"
          isLabelHidden
          shouldFitContainer
          placeholder="Retype password"
          autoComplete='off'
          value={this.state.passwordConfirmation}
          onChange={this.handleChange('passwordConfirmation')}
        />

        <Button shouldFitContainer appearance='primary'>
          Update password
        </Button>
      </div>
    )
  }
}

ResetForm.propTypes = {
  updateUserPassword: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  updateUserPassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetForm)
