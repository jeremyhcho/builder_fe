import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './Dropdown.scss'

const MenuItem = ({ onClick, children }) => (
  <li styleName='option' onClick={onClick}>
    {children}
  </li>
)

MenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default MenuItem
