import React from 'react'

// Component
import FormGroup from 'Components/Common/Input/FormGroup'
import Input from 'Components/Common/Input'

// CSS
import './Inputs.scss'

// Validators
import { presence, email, minChar } from './validators'

class Inputs extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
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
    const { username, password } = this.state
    return (
      <div styleName="inputs">
        <div styleName="input-container">
          <p styleName="label">{this.state.submitForm}</p>
          <FormGroup>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              validator={[presence(), minChar(5)]}
              placeholder="Username"
              label="Username"
            />
            <Input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              validator={[presence(), email()]}
              placeholder="Email"
              label="Email"
            />
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              validator={[presence(), minChar(8)]}
              placeholder="Password"
              label="Password"
            />
            <Input name="submitButton" type="submit" value="Submit form" onClick={this.handleSubmit} />
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default Inputs
