import React from 'react'

// Components
import { FieldText, Button } from 'Components/Common'

// CSS
import './Forgot.scss'

const ForgotForm = () => (
  <div styleName='forgot-container'>
    <FieldText
      name='email'
      label="We'll send a recovery link to"
      type='email'
      shouldFitContainer
      placeholder='Enter email'
      autoComplete='off'
      style={{ margin: 0 }}
    />

    <Button shouldFitContainer appearance='primary'>
      Send recovery link
    </Button>
  </div>
)

export default ForgotForm
