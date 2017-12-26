import React from 'react'
import PropTypes from 'prop-types'

import './Card.scss'

const Card = ({ wrapperStyle, label, children, style, ...props }) => (
  <div {...props} style={{ height: '100%', marginTop: '35px', ...style }}>
    {
      label && (
        <p className="semibold" style={{ marginBottom: '5px', marginLeft: '15px' }}>
          {label}
        </p>
      )
    }
    <div styleName="card" style={wrapperStyle}>
      {children}
    </div>
  </div>
)

Card.defaultProps = {
  wrapperStyle: {},
  label: '',
  children: null,
  style: {}
}

Card.propTypes = {
  wrapperStyle: PropTypes.object,
  label: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object
}

export default Card
