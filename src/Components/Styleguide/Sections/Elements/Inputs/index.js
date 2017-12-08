import React from 'react'

// Component
import Input from 'Components/Common/Input'

// CSS
import './Inputs.scss'

// Validators

class Inputs extends React.Component {
  state = {
    text: '',
    disabled: '',
    invalid: '',
    required: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    this.setState({
      submitForm: `{ username: ${this.state.username}, password: ${this.state.password}, email: ${this.state.email} }`
    })
  }

  render () {
    const { text, invalid, disabled, required } = this.state
    return (
      <div styleName="inputs">
        <div styleName="input-container">
          <Input
            label="Text Input"
            name="text"
            type="text"
            onChange={this.handleChange}
            value={text}
            placeholder="Enter text"
          />
        </div>
        <div styleName="input-container">
          <Input
            label="Invalid Input"
            name="invalid"
            type="text"
            onChange={this.handleChange}
            value={invalid}
            error
            placeholder="Enter text"
          />
        </div>
        <div styleName="input-container">
          <Input
            label="Disabled Input"
            name="disabled"
            type="text"
            onChange={this.handleChange}
            value={disabled}
            disabled
            placeholder="Enter text"
          />
        </div>
        <div styleName="input-container">
          <Input
            label="Required Input"
            name="required"
            type="text"
            onChange={this.handleChange}
            value={required}
            required
            placeholder="Enter text"
          />
        </div>
      </div>
    )
  }
}

export default Inputs
