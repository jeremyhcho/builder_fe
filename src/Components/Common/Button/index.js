import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './Button.scss'

const Button = (props) => {
  switch (props.theme) {
    case 'primary':
      return <button styleName="primary">{props.children}</button>
    case 'secondary':
      return <button styleName="secondary">{props.children}</button>
    default:
      return <button styleName="primary">{props.children}</button>
  }
}

Button.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.string.isRequired
}

Button.defaultProps = {
  theme: 'primary'
}


export default Button
