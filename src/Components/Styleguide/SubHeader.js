import React from 'react'
import PropTypes from 'prop-types'

import './Styleguide.scss'

const SubHeader = ({ subHeaderText, style }) => (
  <div style={{ textAlign: 'center', margin: '25px 0', ...style }}>
    <div className='small' styleName='subheader'>
      <hr />
      <span>{subHeaderText.toUpperCase()}</span>
      <hr />
    </div>
  </div>
)

SubHeader.defaultProps = {
  style: {}
}

SubHeader.propTypes = {
  subHeaderText: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default SubHeader
