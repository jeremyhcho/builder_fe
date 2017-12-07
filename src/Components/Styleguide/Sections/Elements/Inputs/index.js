import React from 'react'

// Component
import Input from 'Components/Common/Input'

// CSS
import './Inputs.scss'

// Validators

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
          <Input
            label="Username"
            name="username"
            type='text'
            onChange={this.handleChange}
            value={username}
            placeholder="Enter username"
          />
          <Input
            label="Password"
            name="password"
            type='password'
            onChange={this.handleChange}
            value={password}
            placeholder="Enter password"
          />
        </div>
      </div>
    )
  }
}

export default Inputs
