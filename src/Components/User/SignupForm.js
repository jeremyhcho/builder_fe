import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// CSS
import './SignupForm.scss'

// Components
import { Button, FieldTextStateless } from 'Components/Common'

// Redux-form
// import { Field, reduxForm } from 'redux-form'

const FieldText = (props) => (
  <div style={{ margin: '15px 0' }}>
    <FieldTextStateless {...props} />
  </div>
)

class SignupForm extends Component {
  render () {
    return (
      <div styleName="login-container">
        <FieldText
          name="username"
          label="username"
          type="text"
          isLabelHidden
          shouldFitContainer
          placeholder="Enter username"
        />
        <FieldText
          name="email"
          label="email"
          type="email"
          isLabelHidden
          shouldFitContainer
          placeholder="Enter email"
        />
        <FieldText
          name="password"
          label="password"
          type="password"
          isLabelHidden
          shouldFitContainer
          placeholder="Create password"
        />
        <div style={{ margin: '15px 0' }}>
          <Button
            shouldFitContainer
            appearance="primary"
          >
            Log In
          </Button>
        </div>
      </div>
    )
  }
}

export default SignupForm
