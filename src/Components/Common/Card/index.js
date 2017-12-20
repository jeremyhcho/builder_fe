import React from 'react'
import PropTypes from 'prop-types'

import './Card.scss'

const Card = ({ wrapperStyle, label, children, ...props }) => (
  <div {...props}>
    <p className="semibold">{label}</p>
    <div styleName="card" style={wrapperStyle}>
      {children}
    </div>
  </div>
)

Card.defaultProps = {
  wrapperStyle: {},
  label: '',
  children: null
}

Card.propTypes = {
  wrapperStyle: PropTypes.object,
  label: PropTypes.string,
  children: PropTypes.node
}

export default Card
