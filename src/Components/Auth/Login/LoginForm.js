import React, { Component } from 'react'

// CSS
import './Login.scss'

// Components
import {
  Button,
  FieldText
} from 'Components/Common'

// Redux-form
// import { Field, reduxForm } from 'redux-form'

class LoginForm extends Component {
  state = {
    isEmailValidated: false
  }

  handleClick = () => {
    if (this.state.isEmailValidated) {
      console.log('Hello!')
    }

    this.setState({ isEmailValidated: true })
  }

  renderPasswordField () {
    const passwordStyles = {
      height: this.state.isEmailValidated ? '40px' : '0',
      transition: 'height 300ms',
      transitionDelay: 'height 1s',
      overflow: 'hidden',
      margin: this.state.isEmailValidated ? '15px 0' : '0'
    }

    return (
      <FieldText
        name='password'
        label='password'
        type='password'
        isLabelHidden
        shouldFitContainer
        placeholder='Enter password'
        autoComplete='off'
        style={passwordStyles}
      />
    )
  }

  render () {
    return (
      <div styleName='login-container'>
        <Button
          style={{ textAlign: 'center', margin: 0 }}
          shouldFitContainer
          iconBefore={
            <i
              className='fa fa-google'
              style={{ display: 'block', fontSize: '14px' }}
            />
          }
        >
          Log in with Google
        </Button>

        <p
          style={{
            textAlign: 'center',
            color: '#97A0AF',
            fontSize: '11px',
            marginTop: '20px'
          }}
        >
          OR
        </p>

        <FieldText
          name='email'
          label='email'
          type='email'
          isLabelHidden
          shouldFitContainer
          placeholder='Enter email'
          autoComplete='off'
        />

        {this.renderPasswordField()}

        <Button shouldFitContainer appearance='primary' onClick={this.handleClick}>
          {this.state.isEmailValidated ? 'Log in' : 'Continue' }
        </Button>
      </div>
    )
  }
}

export default LoginForm
