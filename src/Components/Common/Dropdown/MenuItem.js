import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Dropdown.scss'

const MenuItem = ({ onClick, children, disabled }) => {
  const listItemClass = classNames('option', {
    disabled
  })

  const handleClick = (e) => {
    if (disabled) { return }
    onClick(e)
  }

  return (
    <li styleName={listItemClass} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
  disabled: false
}

MenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default MenuItem
