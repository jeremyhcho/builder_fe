import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Button.scss'

const Button = ({ primary, secondary, flat, disabled, children }) => {
  const buttonClass = classNames('btn', {
    primary: primary || (!secondary && !flat),
    secondary,
    flat,
    disabled
  })

  return <button styleName={buttonClass}>{children}</button>
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  flat: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  flat: false,
  disabled: false,
  children: '',
}

export default Button
