import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-grid-system'

import './Styleguide.scss'

const SubHeader = ({ subHeaderText }) => (
  <Col xs={6} offset={{ xs: 3 }} style={{ textAlign: 'center', margin: '25px 0' }}>
    <div className='small' styleName='subheader'>
      <hr />
      <span>{subHeaderText.toUpperCase()}</span>
      <hr />
    </div>
  </Col>
)

SubHeader.propTypes = {
  subHeaderText: PropTypes.string.isRequired
}

export default SubHeader
