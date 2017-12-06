import React from 'react'
import PropTypes from 'prop-types'

import './Styleguide.scss'

const SubHeader = ({ subHeaderText }) => (
  <div style={{ textAlign: 'center', margin: '25px 0' }}>
    <div className='small' styleName='subheader'>
      <hr />
      <span>{subHeaderText.toUpperCase()}</span>
      <hr />
    </div>
  </div>
)

SubHeader.propTypes = {
  subHeaderText: PropTypes.string.isRequired
}

export default SubHeader
