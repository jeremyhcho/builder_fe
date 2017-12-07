import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Button.scss'

const Button = ({ primary, secondary, flat, disabled, onClick, shouldFitContainer, children }) => {
  const buttonClass = classNames('btn', {
    primary: primary || (!secondary && !flat),
    secondary,
    flat,
    disabled,
    shouldFitContainer
  })
  const buttonClick = () => {
    if (disabled) return;
    onClick()
  }

  return <button styleName={buttonClass} onClick={buttonClick}>{children}</button>
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  flat: PropTypes.bool,
  disabled: PropTypes.bool,
  shouldFitContainer: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  flat: false,
  disabled: false,
  shouldFitContainer: false,
  children: '',
}

export default Button
