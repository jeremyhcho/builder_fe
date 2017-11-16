import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './Colors.scss'

const ColorSwatch = ({ color }) => (
  <div styleName='color'>
    <div styleName='swatch'>
      <div style={{ backgroundColor: color.hex }} />
    </div>

    <p className='small' style={{ marginTop: '10px' }}>
      <p><span className='bold' styleName='label'>VAR</span> {color.var}</p>
      <p><span className='bold' styleName='label'>HEX</span> {color.hex}</p>
    </p>
  </div>
)

ColorSwatch.propTypes = {
  color: PropTypes.object.isRequired
}

export default ColorSwatch
