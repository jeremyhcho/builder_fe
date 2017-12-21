import React from 'react'
import PropTypes from 'prop-types'

import './Card.scss'

const Card = ({ wrapperStyle, label, children, ...props }) => (
  <div {...props} style={{ height: '100%', marginTop: '25px' }}>
    <p className="semibold" style={{ marginBottom: '5px' }}>{label}</p>
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
