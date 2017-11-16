import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './Button.scss'

const Button = (props) => {
  switch (true) {
    case props.primary:
      return <button styleName="btn primary">{props.children}</button>
    case props.secondary:
      return <button styleName="btn secondary">{props.children}</button>
    case props.flat:
      return <button styleName="btn flat">{props.children}</button>
    default:
      return <button styleName="btn primary">{props.children}</button>
  }
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  flat: PropTypes.bool,
  children: PropTypes.node
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  flat: false,
  children: ''
}


export default Button
