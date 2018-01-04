import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Dropdown.scss'

const MenuItem = ({ onClick, children, disabled, icon: Icon }) => {
  const listItemClass = classNames('option', {
    disabled
  })

  const handleClick = (e) => {
    if (disabled) { return }
    onClick(e)
  }

  return (
    <li styleName={listItemClass} onClick={handleClick}>
      <Icon />
      <span>
        {children}
      </span>
    </li>
  )
}

MenuItem.defaultProps = {
  disabled: false
}

MenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default MenuItem
