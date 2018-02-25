import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const QuartzLink = ({ children, style, ...linkProps }) => (
  <Link
    {...linkProps}
    style={{
      display: 'block',
      ...style
    }}
  >
    {children}
  </Link>
)

QuartzLink.defaultProps = {
  style: {}
}

QuartzLink.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func
  ]).isRequired
}

export default QuartzLink
