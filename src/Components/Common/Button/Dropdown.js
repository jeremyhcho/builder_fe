import React, { Component } from 'react'
import PropTypes from 'prop-types'

// CSS
import './Button.scss'

class Dropdown extends Component {
  state = {
    isToggled: false,
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggled: !prevState.isToggled
    }))
  }

  render () {
    const { isToggled } = this.state
    const { children, label } = this.props
    if (children) {
      return (
        <div styleName="dropdown">
          <button styleName="btn primary" onClick={this.handleClick}>
            {label}
            <span style={{ marginLeft: '8px' }}>
              <i className="fa fa-caret-down" aria-hidden="true" />
            </span>
          </button>
          { isToggled && <div styleName="content">{this.props.children}</div>}
        </div>
      )
    }
    return (
      <div styleName="dropdown">
        <button styleName="btn disabled">
          {label}
          <span style={{ marginLeft: '8px' }}>
            <i className="fa fa-caret-down" aria-hidden="true" />
          </span>
        </button>
      </div>
    )
  }
}

Dropdown.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string
}

Dropdown.defaultProps = {
  children: null,
  label: 'Add label',
}

export default Dropdown
