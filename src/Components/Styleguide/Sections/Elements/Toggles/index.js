import React from 'react'
// import PropTypes from 'prop-types'

// Components
import Toggle from 'Components/Common/Toggle'

// CSS
import './Toggles.scss'

class Toggles extends React.Component {
  state = {
    checked1: true,
    checked2: false
  }

  handleChange1 = () => {
    this.setState({ checked1: !this.state.checked1 })
  }

  handleChange2 = () => {
    this.setState({ checked2: !this.state.checked2 })
  }

  render () {
    return (
      <div styleName="toggles">
        <div styleName="toggle-container">
          <p styleName='label'>{this.state.checked1 ? 'On' : 'Off'}</p>
          <Toggle checked={this.state.checked1} onChange={this.handleChange1} />
        </div>
        <div styleName="toggle-container">
          <p styleName='label'>{this.state.checked2 ? 'On' : 'Off'}</p>
          <Toggle checked={this.state.checked2} onChange={this.handleChange2} />
        </div>
      </div>
    )
  }
}

export default Toggles
