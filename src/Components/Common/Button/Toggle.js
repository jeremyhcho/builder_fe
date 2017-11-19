import React, { Component } from 'react'
import PropTypes from 'prop-types'

// CSS
import './Button.scss'

class Toggle extends Component {
  state = {
    isChecked: false,
  }

  componentWillMount() {
    if (this.props.checked) {
      this.setState({
        isChecked: true
      })
    }
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  render () {
    return (
      <label styleName="toggle">
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.toggleChange}
        />
        { !this.state.isChecked
          ? <div
            styleName="unchecked box"
            data-background-checked="&#xf00c;"
            data-background-unchecked="&#xf00d;"
          />
          : <div
            styleName="checked box"
            data-background-checked="&#xf00c;"
            data-background-unchecked="&#xf00d;"
          />
        }

      </label>
    )
  }
}

Toggle.propTypes = {
  checked: PropTypes.bool
}

Toggle.defaultProps = {
  checked: false,
}

export default Toggle
