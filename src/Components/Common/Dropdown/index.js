import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Dropdown.scss'

class Dropdown extends React.Component {
  state = {
    open: false
  }

  onBlur = () => {
    this.setState({ open: false })
  }

  onListClick = (e) => {
    if (e.target.tagName === 'UL') { return }

    this.setState({ open: false })
  }

  toggleDropdown = () => {
    this.setState({ open: !this.state.open })
  }

  render () {
    const { defaultText, children } = this.props
    const { open } = this.state

    const dropdownClass = classNames('dropdown', {
      open
    })

    const optionsClass = classNames('options', {
      open
    })

    const chevronClass = classNames('chevron-down', {
      open
    })

    return (
      <div
        style={{ position: 'relative' }}
        onBlur={this.onBlur}
        tabIndex='0'
      >
        <div
          styleName={dropdownClass}
          onClick={this.toggleDropdown}
        >
          <span>{defaultText}</span>
          <span>
            <i
              className='fa fa-chevron-down'
              styleName={chevronClass}
            />
          </span>
        </div>

        <ul styleName={optionsClass} onClick={this.onListClick}>
          {children}
        </ul>
      </div>
    )
  }
}

Dropdown.propTypes = {
  defaultText: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default Dropdown
